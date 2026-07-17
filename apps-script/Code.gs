/**
 * Mint & Co — audit-lead webhook (Google Apps Script, container-bound).
 *
 * Receives JSON (posted as text/plain) from the /free-audit wizard, appends
 * a row to the "Leads" sheet, then emails a summary to omar@. Deploy per
 * apps-script/DEPLOY.md. Spec: Client Intake Plan v2.1, 03-architecture.md.
 *
 * SECURITY HONESTY: CONFIG.token is a CLIENT ALLOW-LIST TOKEN, not
 * authentication — it ships in the site's public JS bundle and anyone who
 * opens dev tools can read it. Its only job is to reject blind bot traffic
 * POSTing to a guessed/scraped endpoint without loading the page. The
 * honeypot and elapsed-time checks are likewise spoofable once the payload
 * is read; they filter unsophisticated bots only. Escalation trigger: 3+
 * suspicious submissions within minutes → add Cloudflare Turnstile.
 */

var CONFIG = {
  // Must match CLIENT_TOKEN in app/free-audit/IntakeWizard.tsx.
  token: "mintco-fa-2026-compass-7481",
  sheetName: "Leads",
  notifyTo: "omar@mintandco.co.uk",
  emailSubjectPrefix: "New audit request — ",
  // Reject submissions faster than a human could plausibly complete 4 steps.
  minElapsedMs: 3000,
  // Script-wide rolling ceiling. Exists because MailApp's daily quota is a
  // DoS surface: a flood could otherwise black out lead emails for a day.
  rate: { windowSeconds: 600, maxPerWindow: 15 },
  maxFieldLength: 2000,
};

// Sheet columns A–N, in order. "Status" stays blank — Omar's pipeline
// column (New / Audited / Quoted / Won / Lost).
var FIELDS = [
  "businessName", // B
  "businessType", // C
  "location", // D
  "hasWebsite", // E
  "websiteUrl", // F
  "frustration", // G
  "note", // H
  "timeline", // I
  "name", // J
  "contactMethod", // K
  "contactDetail", // L
  "ref", // M
];

function doPost(e) {
  // Always answer success-shaped: bots learn nothing from rejections, and
  // the client never reads this response anyway (no-cors fire-and-forget).
  var out = ContentService.createTextOutput(
    JSON.stringify({ ok: true }),
  ).setMimeType(ContentService.MimeType.JSON);

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return out;
  }
  if (!data || data.token !== CONFIG.token) return out;
  if (data.company) return out; // honeypot filled — silently discard
  if (!(Number(data.elapsedMs) >= CONFIG.minElapsedMs)) return out;
  if (overRateCeiling_()) return out;

  var values = FIELDS.map(function (f) {
    return sanitize_(data[f]);
  });
  var timestamp = Utilities.formatDate(
    new Date(),
    "Europe/London",
    "yyyy-MM-dd HH:mm:ss",
  );
  var row = [timestamp].concat(values).concat([""]); // + blank Status (N)

  // Sheet append and email are isolated: a mail-quota failure must never
  // lose the lead row, and a sheet failure must still send the email.
  var sheetUrl = "";
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.sheetName) || ss.getSheets()[0];
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }
    sheetUrl = ss.getUrl();
  } catch (err) {
    // Row lost — the email below still carries the full lead.
  }

  try {
    MailApp.sendEmail({
      to: CONFIG.notifyTo,
      subject:
        CONFIG.emailSubjectPrefix +
        (String(data.businessName || "(no name)").slice(0, 100) +
          (data.timeline ? " · " + String(data.timeline).slice(0, 40) : "")),
      body: emailBody_(timestamp, values, sheetUrl),
    });
  } catch (err) {
    // Mail failed (quota?) — the sheet row above is the record.
  }

  return out;
}

/** Rolling script-wide submission ceiling via CacheService. */
function overRateCeiling_() {
  var cache = CacheService.getScriptCache();
  var key = "intake-window-count";
  var count = Number(cache.get(key) || 0);
  if (count >= CONFIG.rate.maxPerWindow) return true;
  // put() refreshes the TTL each hit, so the window slides under sustained
  // traffic — stricter than fixed windows, which is what we want here.
  cache.put(key, String(count + 1), CONFIG.rate.windowSeconds);
  return false;
}

/**
 * Length-cap + formula-injection guard. Any value starting with = + - @
 * tab or CR gets an apostrophe prefix so Sheets stores literal text
 * (blocks =IMPORTXML / =HYPERLINK / DDE — also protects Excel exports).
 */
function sanitize_(value) {
  var s = String(value == null ? "" : value).slice(0, CONFIG.maxFieldLength);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return s;
}

function emailBody_(timestamp, values, sheetUrl) {
  var labels = [
    "Business name",
    "Type of business",
    "Location",
    "Has website",
    "Website URL",
    "Frustration",
    "Note",
    "Timeline",
    "Name",
    "Contact method",
    "Contact detail",
    "Ref",
  ];
  var lines = ["New audit request — " + timestamp, ""];
  for (var i = 0; i < labels.length; i++) {
    lines.push(labels[i] + ": " + (values[i] || "—"));
  }
  lines.push("");
  lines.push(sheetUrl ? "Sheet: " + sheetUrl : "(sheet append failed — this email is the record)");
  return lines.join("\n");
}
