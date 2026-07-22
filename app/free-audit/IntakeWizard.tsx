"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "../components/Eyebrow";
import { auditWhatsApp, site } from "../site.config";

/*
 * The 4-step audit-request wizard. Spec: Client Intake Plan v2.1
 * (Client Intake Form/Client Intake Plan/ in the HQ workspace).
 *
 * Submission is fire-and-forget: Apps Script answers via a 302 to
 * script.googleusercontent.com and response readability is inconsistent
 * across browsers (worst on iOS Safari), so we POST with mode:'no-cors'
 * and treat "fetch resolved without throwing" as success. The error state
 * triggers only on a thrown exception (network failure / 8s timeout) and
 * always offers a mailto pre-filled from the answers — nothing typed is
 * ever lost.
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

const STORAGE_KEY = "mintco-free-audit-v1";
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

const FRUSTRATIONS = [
  "No website at all",
  "Site looks dated",
  "Invisible on Google",
  "Not enough enquiries",
  "Not sure — just curious",
];
const BUSINESS_TYPES = [
  "Barber",
  "Salon, beauty or clinic",
  "Trade (plumber, electrician, builder)",
  "Café, restaurant or takeaway",
  "Shop or high-street retail",
  "Dry cleaner, tailor or alterations",
  "Online shop or dropshipping",
  "Social seller (Instagram or TikTok)",
  "Other",
];
const WEBSITE_YES = "Yes, I have one";
const WEBSITE_OPTIONS = [WEBSITE_YES, "No website yet"];
const CONTACT_METHODS = ["Email", "Phone", "WhatsApp"];
const TIMELINES = ["As soon as possible", "Next 1–3 months", "Just exploring"];

const STEP_TITLES = [
  "What's the biggest frustration?",
  "Tell us about your business.",
  "Do you have a website right now?",
  "Where should we send your write-up?",
];

type Answers = {
  frustrations: string[];
  note: string;
  businessName: string;
  businessType: string;
  businessTypeOther: string;
  location: string;
  hasWebsite: string;
  websiteUrl: string;
  name: string;
  contactMethod: string;
  contactDetail: string;
  timeline: string;
};

const EMPTY: Answers = {
  frustrations: [],
  note: "",
  businessName: "",
  businessType: "",
  businessTypeOther: "",
  location: "",
  hasWebsite: "",
  websiteUrl: "",
  name: "",
  contactMethod: "",
  contactDetail: "",
  timeline: "",
};

const STEP_FIELDS: (keyof Answers)[][] = [
  ["frustrations"],
  ["businessName", "businessType", "businessTypeOther", "location"],
  ["hasWebsite", "websiteUrl"],
  ["name", "contactMethod", "contactDetail"],
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isPhone = (v: string) =>
  /^\+?[\d\s()-]{9,16}$/.test(v.trim()) && (v.match(/\d/g) ?? []).length >= 10;
const isUrlish = (v: string) =>
  /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(v.trim());

function businessTypeFinal(a: Answers): string {
  return a.businessType === "Other"
    ? `Other: ${a.businessTypeOther.trim()}`
    : a.businessType;
}

function validateStep(step: number, a: Answers): Partial<Record<keyof Answers, string>> {
  const errs: Partial<Record<keyof Answers, string>> = {};
  if (step === 0) {
    if (a.frustrations.length === 0)
      errs.frustrations = "Pick at least one — as many as apply.";
  }
  if (step === 1) {
    if (!a.businessName.trim()) errs.businessName = "Tell us your business name.";
    if (!a.businessType) errs.businessType = "Pick the closest match.";
    if (a.businessType === "Other" && !a.businessTypeOther.trim())
      errs.businessTypeOther = "Tell us what kind of business you run.";
    if (!a.location.trim()) errs.location = "Tell us roughly where you're based.";
  }
  if (step === 2) {
    if (!a.hasWebsite) errs.hasWebsite = "Let us know either way — no website yet is a fine answer.";
    if (a.hasWebsite === WEBSITE_YES && !isUrlish(a.websiteUrl))
      errs.websiteUrl = "That doesn't look like a web address — try something like yourbusiness.co.uk";
  }
  if (step === 3) {
    if (!a.name.trim()) errs.name = "Tell us your name.";
    if (!a.contactMethod) errs.contactMethod = "Pick how you'd like us to reply.";
    else if (a.contactMethod === "Email" && !isEmail(a.contactDetail))
      errs.contactDetail = "That doesn't look like a working email — try name@business.co.uk";
    else if (a.contactMethod !== "Email" && !isPhone(a.contactDetail))
      errs.contactDetail = "That doesn't look like a UK number — try 07… or +44…";
  }
  return errs;
}

function fallbackMailto(a: Answers): string {
  const lines = [
    "Hi Omar, David & Rodrick,",
    "",
    "I tried the audit form on your site but it didn't go through — here are my answers.",
    "",
    `Business name: ${a.businessName}`,
    `Type of business: ${businessTypeFinal(a)}`,
    `Where we're based: ${a.location}`,
    `Website: ${a.hasWebsite === WEBSITE_YES ? a.websiteUrl : "No website yet"}`,
    `Biggest frustration: ${a.frustrations.join("; ")}`,
    ...(a.note.trim() ? [`Note: ${a.note.trim()}`] : []),
    ...(a.timeline ? [`When we'd like to move: ${a.timeline}`] : []),
    `Name: ${a.name}`,
    `Best way to reach me: ${a.contactMethod} — ${a.contactDetail}`,
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
        className={`mt-2 min-h-[48px] w-full rounded-xl border bg-surface px-4 text-base text-slate placeholder:text-muted/70 ${
          error ? "border-error" : "border-line"
        }`}
      />
      {error && <FieldError id={`${id}-error`} text={error} />}
    </div>
  );
}

/**
 * Single-select chip row with real radio semantics: radiogroup container,
 * role="radio" chips, roving tabindex, arrows move focus, Enter/Space
 * selects. Selected chip = filled pill + leading dot (mint-cta fill — the
 * only mint that may carry white text, per BRAND.md).
 */
function ChipGroup({
  id,
  labelledBy,
  options,
  value,
  onSelect,
  error,
  toggleable = false,
}: {
  id: string;
  labelledBy: string;
  options: readonly string[];
  value: string;
  onSelect: (v: string) => void;
  error?: string;
  toggleable?: boolean;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIdx = options.findIndex((o) => o === value);
  const tabbable = selectedIdx >= 0 ? selectedIdx : 0;

  function pick(opt: string) {
    onSelect(toggleable && opt === value ? "" : opt);
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % options.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (i - 1 + options.length) % options.length;
    else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      pick(options[i]);
      return;
    }
    if (next !== null) {
      e.preventDefault();
      refs.current[next]?.focus();
    }
  }

  return (
    <div>
      <div
        id={id}
        role="radiogroup"
        aria-labelledby={labelledBy}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className="flex flex-wrap gap-2"
      >
        {options.map((opt, i) => {
          const selected = opt === value;
          return (
            <button
              key={opt}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              data-chip=""
              tabIndex={i === tabbable ? 0 : -1}
              onClick={() => pick(opt)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[15px] font-medium transition-colors duration-150 ${
                selected
                  ? "border-mint-cta bg-mint-cta text-white"
                  : "border-line bg-surface text-slate hover:border-mint"
              }`}
            >
              <span
                aria-hidden="true"
                className={`mr-2 inline-block h-2 w-2 rounded-full ${
                  selected ? "bg-white" : "border border-muted/60"
                }`}
              />
              {opt}
            </button>
          );
        })}
      </div>
      {error && <FieldError id={`${id}-error`} text={error} />}
    </div>
  );
}

/**
 * Multi-select chip row (the 02-design-spec "one-vs-many" pattern):
 * role="group" container, plain <button aria-pressed> chips — every chip a
 * natural tab stop, Space/Enter toggles natively. Selected shows a leading
 * CHECK where single-select shows a dot, so sighted users get the same
 * one-vs-many cue AT users get from the semantics.
 */
function MultiChipGroup({
  id,
  labelledBy,
  options,
  values,
  onToggle,
  error,
}: {
  id: string;
  labelledBy: string;
  options: readonly string[];
  values: string[];
  onToggle: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div
        id={id}
        role="group"
        aria-labelledby={labelledBy}
        aria-describedby={error ? `${id}-error` : undefined}
        className="flex flex-wrap gap-2"
      >
        {options.map((opt) => {
          const selected = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              data-chip=""
              onClick={() => onToggle(opt)}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[15px] font-medium transition-colors duration-150 ${
                selected
                  ? "border-mint-cta bg-mint-cta text-white"
                  : "border-line bg-surface text-slate hover:border-mint"
              }`}
            >
              {selected ? (
                <svg viewBox="0 0 12 12" className="mr-2 h-3 w-3 shrink-0" aria-hidden="true">
                  <path
                    d="M2 6.2 4.8 9 10 3.4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-2 w-2 rounded-full border border-muted/60"
                />
              )}
              {opt}
            </button>
          );
        })}
      </div>
      {error && <FieldError id={`${id}-error`} text={error} />}
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
  const [noteOpen, setNoteOpen] = useState(false);
  const [restored, setRestored] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [switchNote, setSwitchNote] = useState("");
  const [company, setCompany] = useState(""); // honeypot — never shown to humans
  const [dir, setDir] = useState<"fwd" | "back" | null>(null);

  const startedAt = useRef(0);
  const refSource = useRef("");
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
        const savedAnswers = saved?.answers as
          | (Partial<Answers> & { frustration?: string })
          | undefined;
        const hasContent =
          savedAnswers &&
          Object.values(savedAnswers).some((v) =>
            Array.isArray(v) ? v.length > 0 : Boolean(v),
          );
        if (savedAnswers && hasContent) {
          // Tolerate the pre-multi-select saved shape (frustration: string).
          const frustrations = Array.isArray(savedAnswers.frustrations)
            ? savedAnswers.frustrations.filter((v): v is string => typeof v === "string")
            : typeof savedAnswers.frustration === "string" && savedAnswers.frustration
              ? [savedAnswers.frustration]
              : [];
          delete savedAnswers.frustration;
          setAnswers({ ...EMPTY, ...savedAnswers, frustrations });
          if (Number.isInteger(saved.step) && saved.step >= 0 && saved.step <= 3)
            setStep(saved.step);
          if (typeof saved.startedAt === "number") startedAt.current = saved.startedAt;
          if (!refSource.current && typeof saved.ref === "string") refSource.current = saved.ref;
          if (savedAnswers.note) setNoteOpen(true);
          setRestored(true);
        }
      }
    } catch {
      // corrupt storage — start clean
    }
    hydrated.current = true;
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated.current || phase === "done") return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, step, startedAt: startedAt.current, ref: refSource.current }),
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

  /** Re-validate one field on blur, but only after the step's first failed Next. */
  function blurCheck(field: keyof Answers) {
    if (!attempted[step]) return;
    const errs = validateStep(step, answers);
    setErrors((e) => ({ ...e, [field]: errs[field] }));
  }

  function focusField(field: keyof Answers) {
    const el = document.getElementById(`fa-${field}`);
    if (!el) return;
    const role = el.getAttribute("role");
    if (role === "radiogroup" || role === "group") {
      (el.querySelector("[data-chip]") as HTMLElement | null)?.focus();
    } else {
      el.focus();
    }
  }

  function next() {
    if (phase === "sending") return;
    const errs = validateStep(step, answers);
    setAttempted((a) => a.map((v, i) => (i === step ? true : v)));
    const bad = STEP_FIELDS[step].filter((f) => errs[f]);
    if (bad.length > 0) {
      setErrors((e) => ({ ...e, ...errs }));
      setAnnounce(bad.length === 1 ? "1 field needs attention." : `${bad.length} fields need attention.`);
      focusField(bad[0]);
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
    setAnswers(EMPTY);
    setErrors({});
    setAttempted([false, false, false, false]);
    setNoteOpen(false);
    setRestored(false);
    setStep(0);
    setPhase("form");
  }

  function selectMethod(m: string) {
    const wasEmail = answers.contactMethod === "Email";
    const isNowEmail = m === "Email";
    if (answers.contactDetail && answers.contactMethod && wasEmail !== isNowEmail) {
      const note = isNowEmail ? "Now for your email address" : "Now for your phone number";
      setAnswers((a) => ({ ...a, contactMethod: m, contactDetail: "" }));
      setSwitchNote(note);
      setAnnounce(note);
    } else {
      setA("contactMethod", m);
    }
    clearError("contactMethod");
  }

  async function submit() {
    if (phase === "sending") return;
    setPhase("sending");
    const begun = Date.now();
    // Keep the "Sending…" state visible for ≥400ms so it never flashes.
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
        businessName: a.businessName.trim(),
        businessType: businessTypeFinal(a),
        location: a.location.trim(),
        hasWebsite: a.hasWebsite === WEBSITE_YES ? "Yes" : "No",
        websiteUrl: a.hasWebsite === WEBSITE_YES ? a.websiteUrl.trim() : "",
        frustration: a.frustrations.join("; "),
        note: a.note.trim(),
        timeline: a.timeline,
        name: a.name.trim(),
        contactMethod: a.contactMethod,
        contactDetail: a.contactDetail.trim(),
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
    const channel =
      answers.contactMethod === "Email"
        ? "by email"
        : answers.contactMethod === "Phone"
          ? "by phone"
          : "on WhatsApp";
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
          {/*
            The {" "} after the name is load-bearing: Turbopack's JSX
            transform eats a plain space that follows an expression opening
            a source line ("Compass Cutscomes across").
          */}
          We&apos;ll reply {channel} with a short, honest look at how{" "}
          {answers.businessName.trim() || "your business"}{" "}
          comes across online: how it
          performs on a phone right now, where you&apos;re likely losing customers, and
          the two or three things we&apos;d fix first — plus a fixed-price quote.
          Usually within one working day.
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
    <div className="mx-auto w-full max-w-[560px] px-5 pb-40 pt-12 sm:px-0 sm:pb-24 sm:pt-16">
      <div aria-live="polite" className="sr-only">
        {announce}
      </div>

      <Eyebrow>Free audit</Eyebrow>
      <div className="mt-4 text-sm text-muted">Step {step + 1} of 4</div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-mint transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${((step + 1) / 4) * 100}%` }}
        />
      </div>

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

        <div
          key={step}
          className={dir === "fwd" ? "step-in-fwd" : dir === "back" ? "step-in-back" : undefined}
        >
          <h1
            id="fa-step-heading"
            ref={headingRef}
            tabIndex={-1}
            className="mt-8 text-[1.9rem] font-medium leading-tight tracking-[-0.01em] text-ink outline-none sm:text-4xl"
          >
            {step === 0 && <>What&apos;s the biggest frustration?</>}
            {step === 1 && <>Tell us about your business.</>}
            {step === 2 && <>Do you have a website right now?</>}
            {step === 3 && <>Where should we send your write-up?</>}
          </h1>

          {step === 0 && (
            <div className="mt-8 space-y-6">
              <p className="text-sm text-muted">
                Takes under two minutes — tap as many as apply.
              </p>
              <MultiChipGroup
                id="fa-frustrations"
                labelledBy="fa-step-heading"
                options={FRUSTRATIONS}
                values={answers.frustrations}
                onToggle={(v) => {
                  setAnswers((a) => ({
                    ...a,
                    frustrations: a.frustrations.includes(v)
                      ? a.frustrations.filter((x) => x !== v)
                      : [...a.frustrations, v],
                  }));
                  clearError("frustrations");
                }}
                error={errors.frustrations}
              />
              {noteOpen ? (
                <div>
                  <label htmlFor="fa-note" className="block text-sm font-medium text-ink">
                    Add a note (optional)
                  </label>
                  <textarea
                    id="fa-note"
                    rows={3}
                    maxLength={2000}
                    placeholder="Anything you'd love this to fix?"
                    value={answers.note}
                    onChange={(e) => setA("note", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-slate placeholder:text-muted/70"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  aria-expanded={false}
                  aria-controls="fa-note"
                  onClick={() => setNoteOpen(true)}
                  className="text-sm font-medium text-mint-deep underline underline-offset-4"
                >
                  + add a note (optional)
                </button>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 space-y-6">
              <TextField
                id="fa-businessName"
                label="Business name"
                value={answers.businessName}
                onChange={(v) => {
                  setA("businessName", v);
                  clearError("businessName");
                }}
                onBlur={() => blurCheck("businessName")}
                error={errors.businessName}
                autoComplete="organization"
              />
              <div>
                <p id="fa-businessType-label" className="text-sm font-medium text-ink">
                  Type of business
                </p>
                <div className="mt-2">
                  <ChipGroup
                    id="fa-businessType"
                    labelledBy="fa-businessType-label"
                    options={BUSINESS_TYPES}
                    value={answers.businessType}
                    onSelect={(v) => {
                      setA("businessType", v);
                      clearError("businessType");
                    }}
                    error={errors.businessType}
                  />
                </div>
              </div>
              {answers.businessType === "Other" && (
                <TextField
                  id="fa-businessTypeOther"
                  label="What kind of business?"
                  value={answers.businessTypeOther}
                  onChange={(v) => {
                    setA("businessTypeOther", v);
                    clearError("businessTypeOther");
                  }}
                  onBlur={() => blurCheck("businessTypeOther")}
                  error={errors.businessTypeOther}
                />
              )}
              <TextField
                id="fa-location"
                label="Where are you based?"
                value={answers.location}
                onChange={(v) => {
                  setA("location", v);
                  clearError("location");
                }}
                onBlur={() => blurCheck("location")}
                error={errors.location}
                placeholder="e.g. Pinner, Harrow"
              />
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 space-y-6">
              <ChipGroup
                id="fa-hasWebsite"
                labelledBy="fa-step-heading"
                options={WEBSITE_OPTIONS}
                value={answers.hasWebsite}
                onSelect={(v) => {
                  setA("hasWebsite", v);
                  clearError("hasWebsite");
                }}
                error={errors.hasWebsite}
              />
              {answers.hasWebsite === WEBSITE_YES && (
                <TextField
                  id="fa-websiteUrl"
                  label="Website address"
                  value={answers.websiteUrl}
                  onChange={(v) => {
                    setA("websiteUrl", v);
                    clearError("websiteUrl");
                  }}
                  onBlur={() => blurCheck("websiteUrl")}
                  error={errors.websiteUrl}
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="yourbusiness.co.uk"
                />
              )}
            </div>
          )}

          {step === 3 && (
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
              <div>
                <p id="fa-contactMethod-label" className="text-sm font-medium text-ink">
                  Best way to reach you
                </p>
                <div className="mt-2">
                  <ChipGroup
                    id="fa-contactMethod"
                    labelledBy="fa-contactMethod-label"
                    options={CONTACT_METHODS}
                    value={answers.contactMethod}
                    onSelect={selectMethod}
                    error={errors.contactMethod}
                  />
                </div>
              </div>
              {answers.contactMethod && (
                <div>
                  <TextField
                    id="fa-contactDetail"
                    label={
                      answers.contactMethod === "Email"
                        ? "Your email address"
                        : answers.contactMethod === "Phone"
                          ? "Your phone number"
                          : "Your WhatsApp number"
                    }
                    value={answers.contactDetail}
                    onChange={(v) => {
                      setA("contactDetail", v);
                      clearError("contactDetail");
                      if (switchNote) setSwitchNote("");
                    }}
                    onBlur={() => blurCheck("contactDetail")}
                    error={errors.contactDetail}
                    type={answers.contactMethod === "Email" ? "email" : "tel"}
                    inputMode={answers.contactMethod === "Email" ? "email" : "tel"}
                    autoComplete={answers.contactMethod === "Email" ? "email" : "tel"}
                    placeholder={
                      answers.contactMethod === "Email" ? "name@business.co.uk" : "07…"
                    }
                  />
                  {switchNote && !errors.contactDetail && (
                    <p className="mt-2 text-sm text-muted">{switchNote}</p>
                  )}
                </div>
              )}
              <div>
                <p id="fa-timeline-label" className="text-sm font-medium text-ink">
                  When would you like to get started?{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  No obligation either way — this just helps us reply usefully.
                </p>
                <div className="mt-3">
                  <ChipGroup
                    id="fa-timeline"
                    labelledBy="fa-timeline-label"
                    options={TIMELINES}
                    value={answers.timeline}
                    onSelect={(v) => setA("timeline", v)}
                    toggleable
                  />
                </div>
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
                <div
                  role="alert"
                  className="rounded-xl border border-error/40 bg-surface p-4"
                >
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
        </div>

        {/*
          Next lives in a fixed thumb-reach bar on mobile (Back offset left and
          visually secondary so a mis-tap can't erase a completed step);
          static inline row on sm+.
        */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md sm:static sm:z-auto sm:mt-10 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <div className="mx-auto flex w-full max-w-[560px] items-center gap-4">
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
            <button
              type="submit"
              disabled={sending}
              className="ml-auto inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl bg-mint-cta px-8 text-base font-semibold tracking-[0.01em] text-white shadow-soft transition duration-150 hover:bg-mint-deep active:scale-[0.98] disabled:opacity-70 sm:flex-none"
            >
              {step < 3 ? "Next" : sending ? "Sending…" : "Get my free write-up"}
            </button>
          </div>
          {sending && (
            <div className="mx-auto mt-3 h-[3px] w-full max-w-[560px] overflow-hidden rounded-full bg-line">
              <div className="h-full w-2/5 rounded-full bg-mint bar-indeterminate" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
