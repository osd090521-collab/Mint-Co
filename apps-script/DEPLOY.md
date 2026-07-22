# Deploying the audit-lead webhook (~5 minutes, Omar's Google account)

The `/free-audit` wizard POSTs to a Google Apps Script web app that appends
each lead to a Google Sheet and emails omar@. Everything runs under your
Google account — no third-party service, no monthly cost.

## 1. Create the Sheet

1. Create a Google Sheet named **Mint & Co — Audit Leads**.
2. Rename the first tab to **Leads**.
3. Paste this header row into A1:N1:

   ```
   Timestamp	Business name	Business type	Location	Has website	Website URL	Frustration	Note	Timeline	Name	Contact method	Contact detail	Ref	Status
   ```

4. **Sharing:** keep it restricted to named people only (you, David,
   Rodrick). Never "anyone with the link" — it holds personal data
   (UK GDPR; retention promise on the privacy page is 12 months).

## 2. Add the script

1. In the Sheet: **Extensions → Apps Script**.
2. Delete the placeholder and paste the entire contents of `Code.gs`
   (this folder). The token in `CONFIG.token` is already set and already
   matches the site — don't change it (if you ever do, change
   `CLIENT_TOKEN` in `app/free-audit/IntakeWizard.tsx` to the same value
   and redeploy the site).
3. Save (Ctrl+S).

## 3. Deploy as a web app

1. **Deploy → New deployment → Web app.**
2. Execute as: **Me**. Who has access: **Anyone**. (Required — visitors'
   browsers POST anonymously. The script itself filters what it accepts.)
3. Authorise when prompted, then copy the **Web app URL**
   (`https://script.google.com/macros/s/…/exec`).

> ⚠️ **Redeploys:** always use **Deploy → Manage deployments → Edit →
> New version** on the *existing* deployment. Creating a *new* deployment
> mints a **new URL** and silently orphans the live site.

## 4. Test with curl (before wiring the site)

```bash
# NOTE: no `-X POST` — that would force POST on the 302 redirect hop too,
# which Google rejects with a 411. `--data` makes the first hop a POST and
# lets curl switch to GET when following the redirect.
curl -sL 'PASTE_WEB_APP_URL_HERE' \
  -H 'Content-Type: text/plain' \
  --data '{"token":"mintco-fa-2026-compass-7481","elapsedMs":5000,"company":"","ref":"curl-test","businessName":"Curl Test Barbers","businessType":"Barber","location":"Pinner","hasWebsite":"No","websiteUrl":"","frustration":"No website at all","note":"delete this row","timeline":"","name":"Curl Test","contactMethod":"Email","contactDetail":"test@example.com"}'
```

If the first hop returns **401**, the deployment's "Who has access" is not
**Anyone** — fix via Deploy → Manage deployments → ✏️ Edit → set access →
New version → Deploy (URL stays the same).

Expected: `{"ok":true}` in the terminal, a new row in **Leads**, and an
email to omar@ within a minute. Delete the test row afterwards.

Worth 30 more seconds: run it again with `"company":"bot"` — you should
get `{"ok":true}` but **no row and no email** (honeypot working).

## 5. Wire the site

1. Local: create `mint-and-co-site/.env.local` containing:

   ```
   NEXT_PUBLIC_INTAKE_URL=PASTE_WEB_APP_URL_HERE
   ```

2. Vercel: Project → Settings → Environment Variables → add
   `NEXT_PUBLIC_INTAKE_URL` (all environments), then redeploy.

Until the variable is set, the form still works for visitors — submissions
fall through to the error state, which offers a pre-filled email instead.
Nothing typed is ever lost.

## Ongoing

- **Retention:** privacy page promises deletion after 12 months — set a
  recurring calendar reminder to clear stale "Lost" rows.
- **Escalation trigger:** 3+ suspicious submissions within minutes → add
  Cloudflare Turnstile to the form (slot reserved in the design).
- MailApp quota is ~1,500/day on Workspace; the script's rate ceiling
  (15 per 10 minutes) exists to stop a flood exhausting it. The sheet row
  is always attempted even if mail fails.
