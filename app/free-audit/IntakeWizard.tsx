"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Cta } from "../components/Cta";
import { Eyebrow } from "../components/Eyebrow";
import { ScaleReveal } from "../components/ScaleReveal";
import { auditWhatsApp, site } from "../site.config";

/*
 * The 4-step audit-request wizard: name, how many people they employ, what
 * they spend (or want to spend) on marketing, and a phone number to call
 * them back on. Cut down from an earlier draft that asked revenue + photos
 * instead of employees/marketing spend — client correction: those are the
 * two numbers that actually size up a lead for us, not turnover.
 *
 * Phone stays in even though it wasn't named in the latest instruction —
 * without a contact channel there's no way to act on the lead at all. If
 * that's wrong, easiest fix is deleting the Phone step below.
 *
 * Submission is fire-and-forget: Apps Script answers via a 302 to
 * script.googleusercontent.com and response readability is inconsistent
 * across browsers (worst on iOS Safari), so we POST with mode:'no-cors'
 * and treat "fetch resolved without throwing" as success. The error state
 * triggers only on a thrown exception (network failure / 8s timeout) and
 * always offers a mailto pre-filled from the answers — nothing typed is
 * ever lost.
 *
 * NOTE: the Apps Script backend (apps-script/Code.gs) was built against the
 * old field set — it needs a matching update to read employees/marketingSpend/
 * phone/name instead of businessName/businessType/etc. before submissions
 * actually land anywhere. Flagged, not done here — out of scope for a
 * frontend pass.
 */

/**
 * Client allow-list token — ships in the public bundle by design. It is a
 * bot filter, NOT authentication: anyone can read it in dev tools. Its only
 * job is to reject blind bot traffic POSTing to a guessed/scraped endpoint
 * without loading this page. Must match CONFIG.token in apps-script/Code.gs.
 */
const CLIENT_TOKEN = "mintco-fa-2026-compass-7481";

/** Apps Script web-app URL. Until set, submits go straight to the mailto fallback. */
const INTAKE_URL = process.env.NEXT_PUBLIC_INTAKE_URL ?? "";

const STORAGE_KEY = "mintco-free-audit-v3";
const KNOWN_REFS = [
  "nav",
  "footer",
  "hero",
  "band-home",
  "band-services",
  "band-packages",
  "band-process",
  "band-about",
];

// Employee-count slider stops — just you, up through a genuinely open-ended
// top band. Coarse on purpose: nobody needs to specify 14 vs 15.
const EMPLOYEE_STOPS = [1, 2, 3, 5, 10, 15, 20, 30, 50];

function formatEmployees(v: number): string {
  const isTop = v >= EMPLOYEE_STOPS[EMPLOYEE_STOPS.length - 1];
  if (v === 1) return "Just me";
  return isTop ? `${v}+ people` : `${v} people`;
}

// Marketing-spend slider stops — what they currently spend, or would be
// comfortable spending, per month. Same reasoning as revenue: nobody knows
// this to the pound, so it's a coarse discrete scale, not a free-text box.
const SPEND_STOPS = [0, 50, 100, 250, 500, 1000, 2000, 5000];

function formatSpend(v: number): string {
  const isTop = v >= SPEND_STOPS[SPEND_STOPS.length - 1];
  if (v === 0) return "£0/mo — nothing yet";
  const label = v >= 1000 ? `£${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : `£${v}`;
  return isTop ? `${label}+/mo` : `${label}/mo`;
}

const STEP_TITLES = [
  "What's your name?",
  "How many people work with you?",
  "What do you spend on marketing?",
  "Where can we call you?",
];

type Answers = {
  name: string;
  employeesIndex: number;
  spendIndex: number;
  phone: string;
};

const EMPTY: Answers = {
  name: "",
  employeesIndex: 0, // defaults to "Just me"
  spendIndex: 1, // defaults to £50/mo rather than the £0 floor
  phone: "",
};

/**
 * A per-submission id, generated once and reused across retries within the
 * same session (persisted alongside the answers draft — see the hydration
 * effect below). Lets the backend recognise "the same lead, submitted
 * twice" — a real risk given the no-cors fire-and-forget design: a
 * false-failure retry, a second tab, or a resubmit after a slow response
 * would otherwise write a duplicate row with no way to tell it apart from a
 * genuinely new lead.
 */
function genSubmissionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const isPhone = (v: string) =>
  /^\+?[\d\s()-]{9,16}$/.test(v.trim()) && (v.match(/\d/g) ?? []).length >= 10;

function fallbackMailto(a: Answers): string {
  const lines = [
    "Hi Mint & Co,",
    "",
    "I tried the audit form on your site but it didn't go through — here are my answers.",
    "",
    `Name: ${a.name}`,
    `Team size: ${formatEmployees(EMPLOYEE_STOPS[a.employeesIndex])}`,
    `Marketing spend: ${formatSpend(SPEND_STOPS[a.spendIndex])}`,
    `Phone: ${a.phone}`,
    "",
    "Thanks.",
  ];
  const subject = encodeURIComponent(site.audit.subject);
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/* ---------- shared field pieces ---------- */

function FieldError({ id, text }: { id: string; text: string }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-error">
      <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
      </svg>
      {text}
    </p>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  inputMode?: "email" | "tel" | "url" | "text";
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={200}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 min-h-[56px] w-full rounded-2xl border bg-surface px-5 text-lg text-slate placeholder:text-muted/70 focus:border-mint-cta focus:outline-none focus:ring-2 focus:ring-mint-cta/20 ${
          error ? "border-error" : "border-line"
        }`}
      />
      {error && <FieldError id={`${id}-error`} text={error} />}
    </div>
  );
}

/**
 * Shared premium slider shell: big centered readout, gradient-filled track,
 * oversized thumb (styled via .range-premium in globals.css), tick labels
 * either end. Used for both the employees and marketing-spend steps —
 * same visual language, different stop arrays.
 */
function PremiumSlider({
  index,
  max,
  label,
  minTick,
  maxTick,
  ariaLabel,
  onChange,
}: {
  index: number;
  max: number;
  label: string;
  minTick: string;
  maxTick: string;
  ariaLabel: string;
  onChange: (i: number) => void;
}) {
  const pct = (index / max) * 100;
  return (
    <div className="rounded-3xl border border-line bg-warm px-6 py-10 sm:px-10">
      <div className="text-center">
        <div className="font-display text-4xl font-medium tracking-tight text-mint-deep sm:text-5xl">
          {label}
        </div>
      </div>

      <div className="relative mt-10">
        <div className="relative h-2 rounded-full bg-line">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-mint to-mint-cta transition-[width] duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={max}
          step={1}
          value={index}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={ariaLabel}
          aria-valuetext={label}
          className="range-premium absolute inset-x-0 -top-3 h-8 w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>

      <div className="mt-4 flex justify-between text-xs text-muted">
        <span>{minTick}</span>
        <span>{maxTick}</span>
      </div>
    </div>
  );
}

/* ---------- the wizard ---------- */

export function IntakeWizard() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"form" | "sending" | "done" | "failed">("form");
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Answers, string>>>({});
  const [attempted, setAttempted] = useState<boolean[]>([false, false, false, false]);
  const [restored, setRestored] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [company, setCompany] = useState(""); // honeypot — never shown to humans
  const [dir, setDir] = useState<"fwd" | "back" | null>(null);

  const startedAt = useRef(0);
  const refSource = useRef("");
  const submissionId = useRef("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect --
       One-shot hydration-safe restore: sessionStorage is client-only, so
       the server-rendered markup must start empty and the saved answers can
       only be applied after mount. Runs once; no cascading updates. */
    startedAt.current = Date.now();
    const fromUrl = new URLSearchParams(window.location.search).get("ref") ?? "";
    if (KNOWN_REFS.includes(fromUrl)) refSource.current = fromUrl;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        const savedAnswers = saved?.answers as Partial<Answers> | undefined;
        const hasContent =
          savedAnswers && Object.values(savedAnswers).some((v) => Boolean(v));
        if (savedAnswers && hasContent) {
          setAnswers({ ...EMPTY, ...savedAnswers });
          if (Number.isInteger(saved.step) && saved.step >= 0 && saved.step <= 3)
            setStep(saved.step);
          if (typeof saved.startedAt === "number") startedAt.current = saved.startedAt;
          if (!refSource.current && typeof saved.ref === "string") refSource.current = saved.ref;
          if (typeof saved.submissionId === "string" && saved.submissionId)
            submissionId.current = saved.submissionId;
          setRestored(true);
        }
      }
    } catch {
      // corrupt storage — start clean
    }
    if (!submissionId.current) submissionId.current = genSubmissionId();
    hydrated.current = true;
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated.current || phase === "done") return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          answers,
          step,
          startedAt: startedAt.current,
          ref: refSource.current,
          submissionId: submissionId.current,
        }),
      );
    } catch {
      // storage blocked/full — autosave is best-effort
    }
  }, [answers, step, phase]);

  useEffect(() => {
    if (dir === null && phase !== "done") return; // never steal focus on first load
    headingRef.current?.focus();
  }, [step, dir, phase]);

  function setA<K extends keyof Answers>(key: K, v: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: v }));
  }

  function clearError(field: keyof Answers) {
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  }

  function blurCheck(field: keyof Answers) {
    if (!attempted[step]) return;
    const errs = validateStep(step, answers);
    setErrors((e) => ({ ...e, [field]: errs[field] }));
  }

  function validateStep(s: number, a: Answers): Partial<Record<keyof Answers, string>> {
    const errs: Partial<Record<keyof Answers, string>> = {};
    if (s === 0 && !a.name.trim()) errs.name = "Tell us your name.";
    if (s === 3 && !isPhone(a.phone))
      errs.phone = "That doesn't look like a UK number — try 07… or +44…";
    return errs;
  }

  function next() {
    if (phase === "sending") return;
    const errs = validateStep(step, answers);
    setAttempted((a) => a.map((v, i) => (i === step ? true : v)));
    const bad = Object.keys(errs) as (keyof Answers)[];
    if (bad.length > 0) {
      setErrors((e) => ({ ...e, ...errs }));
      setAnnounce("That field needs a second look.");
      document.getElementById(`fa-${bad[0]}`)?.focus();
      return;
    }
    if (step < 3) {
      setDir("fwd");
      setStep(step + 1);
      setAnnounce(`Step ${step + 2} of 4: ${STEP_TITLES[step + 1]}`);
    } else {
      void submit();
    }
  }

  function back() {
    if (step === 0 || phase === "sending") return;
    setDir("back");
    setStep(step - 1);
    setPhase("form");
    setAnnounce(`Step ${step} of 4: ${STEP_TITLES[step - 1]}`);
  }

  function startFresh() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    startedAt.current = Date.now();
    submissionId.current = genSubmissionId();
    setAnswers(EMPTY);
    setErrors({});
    setAttempted([false, false, false, false]);
    setRestored(false);
    setStep(0);
    setPhase("form");
  }

  async function submit() {
    if (phase === "sending") return;
    setPhase("sending");
    const begun = Date.now();
    const minDelay = () =>
      new Promise((r) => setTimeout(r, Math.max(0, 400 - (Date.now() - begun))));
    try {
      if (!INTAKE_URL) throw new Error("intake endpoint not configured");
      const a = answers;
      const payload = {
        token: CLIENT_TOKEN,
        elapsedMs: Date.now() - startedAt.current,
        company,
        ref: refSource.current,
        submissionId: submissionId.current || genSubmissionId(),
        name: a.name.trim(),
        employees: EMPLOYEE_STOPS[a.employeesIndex],
        employeesLabel: formatEmployees(EMPLOYEE_STOPS[a.employeesIndex]),
        marketingSpend: SPEND_STOPS[a.spendIndex],
        marketingSpendLabel: formatSpend(SPEND_STOPS[a.spendIndex]),
        phone: a.phone.trim(),
      };
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      try {
        await fetch(INTAKE_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload),
          signal: ctrl.signal,
        });
      } finally {
        clearTimeout(timer);
      }
      await minDelay();
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setPhase("done");
    } catch {
      await minDelay();
      setPhase("failed");
    }
  }

  /* ---------- confirmation ---------- */

  if (phase === "done") {
    const firstName = answers.name.trim().split(/\s+/)[0] || "there";
    const whatsApp = auditWhatsApp();
    return (
      <div className="mx-auto w-full max-w-[560px] px-5 py-16 sm:px-0 sm:py-24">
        <div aria-live="polite" className="sr-only">
          {announce}
        </div>
        <Eyebrow>Free audit</Eyebrow>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-6 text-[1.9rem] font-medium leading-tight tracking-[-0.01em] text-ink outline-none sm:text-4xl"
        >
          Thanks, {firstName} — your write-up is on its way.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-slate sm:text-lg">
          We&apos;ll call you on {answers.phone.trim()} with a short, honest look at
          how your business comes across online: where you&apos;re likely losing
          customers, and the two or three things we&apos;d fix first — plus which
          package fits. Usually within one working day.
        </p>
        <div className="mt-10 space-y-4 text-base">
          <p>
            Curious what&apos;s included?{" "}
            <Link
              href="/packages"
              className="font-medium text-mint-deep underline underline-offset-4"
            >
              See our packages →
            </Link>
          </p>
          {whatsApp && (
            <p>
              Can&apos;t wait?{" "}
              <a
                href={whatsApp}
                className="font-medium text-mint-deep underline underline-offset-4"
              >
                Message us on WhatsApp →
              </a>
            </p>
          )}
          <p className="pt-2 text-sm text-muted">
            <Link href="/" className="underline underline-offset-4">
              ← Back to the homepage
            </Link>
          </p>
        </div>
      </div>
    );
  }

  /* ---------- form ---------- */

  const sending = phase === "sending";

  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pb-40 pt-12 sm:px-0 sm:pb-24 sm:pt-16">
      <div aria-live="polite" className="sr-only">
        {announce}
      </div>

      <Eyebrow>Free audit</Eyebrow>

      <div className="mt-5 flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-mint-cta" : "bg-line"
            }`}
          />
        ))}
      </div>
      <div className="mt-2 text-sm text-muted">Step {step + 1} of 4</div>

      {restored && (
        <p className="mt-4 text-sm text-muted">
          Picking up where you left off —{" "}
          <button
            type="button"
            onClick={startFresh}
            className="font-medium text-mint-deep underline underline-offset-4"
          >
            start fresh
          </button>
        </p>
      )}

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        {/* Honeypot — hidden from every human (screen readers + keyboard included). */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="fa-hp-company">Company</label>
          <input
            id="fa-hp-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <ScaleReveal
          key={step}
          className={`spotlight-card rounded-[1.75rem] border border-line bg-surface p-5 shadow-[0_24px_70px_-24px_rgba(16,33,27,0.18)] sm:rounded-[2rem] sm:p-8 md:p-10 ${
            dir === "fwd" ? "step-in-fwd" : dir === "back" ? "step-in-back" : ""
          }`}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
          }}
        >
          <h1
            id="fa-step-heading"
            ref={headingRef}
            tabIndex={-1}
            className="relative z-[2] text-[1.5rem] font-medium leading-tight tracking-[-0.01em] text-ink outline-none sm:text-[1.9rem] md:text-[2.1rem]"
          >
            {STEP_TITLES[step]}
          </h1>

          {step === 0 && (
            <div className="mt-8 space-y-6">
              <TextField
                id="fa-name"
                label="Your name"
                value={answers.name}
                onChange={(v) => {
                  setA("name", v);
                  clearError("name");
                }}
                onBlur={() => blurCheck("name")}
                error={errors.name}
                autoComplete="name"
              />
            </div>
          )}

          {step === 1 && (
            <div className="mt-8">
              <PremiumSlider
                index={answers.employeesIndex}
                max={EMPLOYEE_STOPS.length - 1}
                label={formatEmployees(EMPLOYEE_STOPS[answers.employeesIndex])}
                minTick="Just me"
                maxTick="50+"
                ariaLabel="Number of employees"
                onChange={(i) => setA("employeesIndex", i)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="mt-8">
              <PremiumSlider
                index={answers.spendIndex}
                max={SPEND_STOPS.length - 1}
                label={formatSpend(SPEND_STOPS[answers.spendIndex])}
                minTick="£0"
                maxTick="£5k+"
                ariaLabel="Monthly marketing spend"
                onChange={(i) => setA("spendIndex", i)}
              />
              <p className="mt-4 text-center text-sm text-muted">
                Whatever you currently spend, or would be comfortable spending.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="mt-8 space-y-6">
              <p className="text-sm text-muted">
                So we can call you with the write-up instead of leaving it to email.
              </p>
              <TextField
                id="fa-phone"
                label="Your phone number"
                value={answers.phone}
                onChange={(v) => {
                  setA("phone", v);
                  clearError("phone");
                }}
                onBlur={() => blurCheck("phone")}
                error={errors.phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="07…"
              />
              <div className="rounded-2xl border border-mint/20 bg-tint p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-mint-deep">
                  What&apos;s included
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Every write-up comes back with the package that fits — from a
                  built, hosted, secured website with missed-call text-back,
                  up to the Full Package: Google review automation, instant
                  lead follow-up, text remarketing and local SEO. No setup
                  fee, no minimum term.
                </p>
                <Link
                  href="/packages"
                  className="mt-2 inline-block text-sm font-medium text-mint-deep underline underline-offset-4"
                >
                  See exactly what&apos;s in each package →
                </Link>
              </div>
              <p className="text-sm text-muted">
                Free, no obligation — and we&apos;ll only use your details to reply.{" "}
                <Link
                  href="/privacy#audit-form"
                  className="font-medium text-mint-deep underline underline-offset-4"
                >
                  How we handle your data →
                </Link>
              </p>
              {phase === "failed" && (
                <div role="alert" className="rounded-xl border border-error/40 bg-surface p-4">
                  <p className="text-sm font-medium text-error">
                    Something went wrong on our end — you can email us instead and
                    we&apos;ll pick it up straight away.
                  </p>
                  <p className="mt-2 text-sm">
                    <a
                      href={fallbackMailto(answers)}
                      className="font-medium text-mint-deep underline underline-offset-4"
                    >
                      Email us your answers →
                    </a>{" "}
                    <span className="text-muted">
                      (pre-filled — nothing you typed is lost). Or just try again below.
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
        </ScaleReveal>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md sm:static sm:z-auto sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <div className="mx-auto flex w-full max-w-[640px] items-center gap-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={back}
                disabled={sending}
                className="min-h-[44px] px-2 text-sm font-medium text-mint-deep underline underline-offset-4 disabled:opacity-50"
              >
                ← Back
              </button>
            ) : (
              <span aria-hidden="true" />
            )}
            <Cta type="submit" disabled={sending} className="ml-auto flex-1 sm:flex-none">
              {step < 3 ? "Next" : sending ? "Sending…" : "Get my free write-up"}
            </Cta>
          </div>
          {sending && (
            <div className="mx-auto mt-3 h-[3px] w-full max-w-[640px] overflow-hidden rounded-full bg-line">
              <div className="h-full w-2/5 rounded-full bg-mint bar-indeterminate" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
