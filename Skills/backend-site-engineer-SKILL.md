---
name: backend-site-engineer
description: Builds, audits, and fixes backend functionality for the Mint & Co website, including API routes, contact forms, validation, email notifications, environment variables, spam protection, rate limiting, database writes, and deployment safety.
---

# Backend Site Engineer Skill

Use this skill when working on backend/server-side functionality for the Mint & Co website.

This skill is strictly for backend logic.

Do not use this skill for visual design, brand copywriting, page layout, animations, or frontend styling unless the frontend change is directly required to connect to backend functionality.

---

## 1. Primary goal

The backend must make the Mint & Co website reliable, secure, and production-ready.

The website needs to support serious business enquiries, contact actions, form submissions, booking/contact flows, and future operational features without exposing secrets, breaking in production, or creating poor user trust.

Every backend change should improve one or more of:

- Reliability
- Security
- Form handling
- Data validation
- Email delivery
- Spam protection
- Deployment stability
- Maintainability
- Observability
- Production readiness

---

## 2. Default technical assumptions

Unless the project clearly uses something else, assume:

- Framework: Next.js App Router
- Hosting: Vercel
- Language: TypeScript
- Backend style: API routes, server actions, or server-only utilities
- Validation: Zod or equivalent schema validation
- Email provider: Resend, Postmark, SendGrid, SMTP, or existing configured provider
- Database: Only add database logic if the project already uses one or the task specifically requires it

Before adding a new dependency, check whether the project already has an equivalent package.

Avoid unnecessary complexity.

---

## 3. Backend responsibilities

This skill can work on:

- Contact form API routes
- Enquiry form handling
- Booking/contact request flows
- Server-side validation
- Input sanitisation
- Email notifications
- Auto-reply emails
- Database writes
- Environment variable setup
- Rate limiting
- Spam protection
- Error handling
- Server logging
- Webhooks
- Analytics event forwarding
- Vercel deployment issues
- API route debugging
- Server-only utility functions
- Production readiness checks

---

## 4. Backend non-goals

Do not use this skill for:

- Visual redesigns
- Hero section copy
- Brand positioning
- UI animation
- Colour systems
- Logo work
- Component styling
- Sales page structure
- SEO copywriting
- Social media content

If the task includes backend and frontend, handle only the backend part unless the frontend change is necessary to test or connect the backend.

---

## 5. Backend design principles

Backend code must be:

- Simple
- Secure
- Typed
- Validated
- Easy to debug
- Easy to deploy
- Easy to extend
- Minimal in dependency count
- Safe with user data
- Clear in error handling

Prefer boring, reliable code over clever code.

Do not overengineer.

Do not create a custom backend system where a simple API route is enough.

---

## 6. Contact form backend standard

The Mint & Co contact/enquiry form is a priority backend feature.

A production-ready contact form must include:

- Server-side validation
- Input sanitisation
- Required field checks
- Email format validation
- Message length limits
- Honeypot spam field
- Rate limiting where possible
- Safe error responses
- Email notification to Mint & Co
- Optional auto-confirmation to the sender
- No exposed secrets
- Clear success/failure response
- Production-safe environment variables

Client-side validation is useful, but never enough.

Always validate on the server.

---

## 7. Recommended enquiry fields

Use only fields that create genuine value.

Recommended fields:

- name
- businessName
- email
- phone
- websiteUrl
- message
- preferredContactMethod
- sourcePage

Optional fields:

- currentProblem
- serviceInterest
- bestTimeToContact
- budgetRange

Avoid long forms unless specifically requested.

---

## 8. Validation rules

Use a schema validator where available.

Recommended validation rules:

- name: required, string, 2–80 characters
- businessName: optional or required, string, max 120 characters
- email: required, valid email format
- phone: optional, string, max 30 characters
- websiteUrl: optional, valid URL if provided
- message: required, string, 20–2000 characters
- preferredContactMethod: optional enum
- sourcePage: optional string
- honeypot: must be empty

Reject:

- Empty submissions
- Invalid emails
- Invalid URLs
- Extremely short messages
- Extremely long messages
- Unexpected payload shapes
- Filled honeypot fields
- Suspicious repeated submissions

---

## 9. Example Zod schema pattern

Use this style where appropriate:

```ts
import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2).max(80),
  businessName: z.string().max(120).optional(),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  message: z.string().min(20).max(2000),
  preferredContactMethod: z
    .enum(["email", "phone", "whatsapp"])
    .optional(),
  sourcePage: z.string().max(200).optional(),
  honeypot: z.string().max(0).optional(),
});
```

Adjust field names to match the existing project.

Do not duplicate schemas across the codebase. Reuse a shared schema where possible.

---

## 10. API route response standard

Return predictable JSON.

Success response:

```json
{
  "success": true,
  "message": "Your enquiry has been sent."
}
```

Validation error response:

```json
{
  "success": false,
  "message": "Please check the form and try again."
}
```

Server error response:

```json
{
  "success": false,
  "message": "Something went wrong. Please try again shortly."
}
```

Never expose:

- Stack traces
- Raw provider errors
- Database errors
- Secret values
- Internal implementation details

---

## 11. HTTP status code rules

Use correct status codes:

- 200: successful submission
- 400: invalid form data
- 405: method not allowed
- 429: too many requests
- 500: server failure

Do not return 200 for failed submissions.

Do not return raw errors to the frontend.

---

## 12. Environment variable rules

Keep all secrets server-side.

Never expose private keys through public environment variables.

In Next.js:

- Private variables must not start with `NEXT_PUBLIC_`
- Public variables may only contain values safe for the browser
- Email API keys must stay server-side
- Database credentials must stay server-side
- Webhook secrets must stay server-side

Use `.env.example` to document required variables.

Example:

```env
RESEND_API_KEY=
FORM_NOTIFICATION_EMAIL=
FORM_FROM_EMAIL=
DATABASE_URL=
```

Never commit real `.env` files.

---

## 13. Email notification rules

When a valid enquiry is received, send a clear notification email to Mint & Co.

The email should include:

- Name
- Business name
- Email
- Phone
- Existing website URL
- Preferred contact method
- Message
- Source page
- Submission timestamp

Subject pattern:

```txt
New Mint & Co enquiry from {{businessName}}
```

Fallback subject:

```txt
New Mint & Co website enquiry
```

The email should be plain, readable, and easy to act on.

Avoid overdesigned HTML emails unless requested.

---

## 14. Optional auto-reply rules

Only add an auto-reply if requested or already part of the project.

If used, the auto-reply should:

- Confirm receipt
- Avoid promising an exact outcome
- Avoid sounding automated and cold
- Avoid exposing internal process
- Include a simple next step

Example message:

```txt
Thanks for getting in touch with Mint & Co. We’ve received your enquiry and will review the details before coming back with a clear next step.
```

Do not guarantee rankings, bookings, or results.

---

## 15. Spam protection rules

Use layered spam protection.

Minimum:

- Honeypot field
- Server-side validation
- Message length limits
- Rate limiting if available
- Reject suspicious repeated submissions

Optional:

- Cloudflare Turnstile
- reCAPTCHA
- IP-based throttling
- Email domain checks
- User-agent checks

Do not make spam protection so aggressive that real users struggle to submit the form.

---

## 16. Rate limiting rules

Where possible, rate limit form submissions.

Preferred limits:

- Per IP
- Per email address
- Per time window

Example:

- Maximum 3 submissions per 10 minutes per IP
- Maximum 5 submissions per hour per email

If the project has no rate-limiting infrastructure, either:

- Use a lightweight existing package
- Use provider-level protection
- Add a clearly documented TODO if proper rate limiting requires infrastructure not yet present

Do not silently skip rate limiting on production forms.

---

## 17. Database storage rules

Only store form submissions if required.

If storing enquiries, use a simple structure:

- id
- name
- business_name
- email
- phone
- website_url
- preferred_contact_method
- message
- source_page
- status
- created_at
- updated_at

Suggested statuses:

- new
- contacted
- qualified
- closed
- spam

Do not store unnecessary data.

Do not store sensitive data without a clear purpose.

---

## 18. Privacy and data handling

Treat form submissions as private business enquiries.

Do not:

- Log full messages unnecessarily
- Expose submissions client-side
- Store more data than needed
- Send private data to unnecessary third parties
- Include secrets or private data in error messages

Prefer:

- Minimal data collection
- Clear storage purpose
- Secure server-side handling
- Controlled email notifications
- Basic auditability

---

## 19. Server logging rules

Logs should help debugging without leaking private data.

Good logs:

```txt
Contact form submission failed validation
Email provider request failed
Rate limit exceeded for contact form
```

Avoid logs like:

```txt
Full user message: ...
API key used: ...
Database URL: ...
Raw provider response with private fields: ...
```

Log event type, not private content.

---

## 20. Webhook rules

If adding webhooks, always include:

- Signature verification where supported
- Secret stored in environment variables
- Method validation
- Payload validation
- Idempotency protection where relevant
- Safe error handling
- Clear logging

Never trust webhook payloads without verification.

---

## 21. Analytics event forwarding

If backend sends analytics/conversion events, keep it simple.

Track useful events only:

- enquiry_submitted
- booking_clicked
- call_clicked
- whatsapp_clicked

Do not send unnecessary personal data to analytics tools.

Do not block the form submission if analytics fails.

Analytics should never be more important than the enquiry flow.

---

## 22. File and folder organisation

Prefer clear backend organisation.

Possible structure:

```txt
src/
  app/
    api/
      contact/
        route.ts
  lib/
    validation/
      enquiry.ts
    email/
      send-enquiry-email.ts
    rate-limit/
      rate-limit.ts
    env/
      env.ts
```

Adapt to the existing project structure.

Do not restructure the whole project unless necessary.

---

## 23. Deployment safety

Before finishing backend work, check production deployment risks:

- Does the project build?
- Are required environment variables documented?
- Are server-only variables kept private?
- Does the API route work on Vercel?
- Are unsupported Node APIs used?
- Does the route need Edge or Node runtime?
- Are email provider domains configured?
- Are errors handled correctly in production?
- Is the response shape stable for the frontend?

If using Node-only libraries, make sure the route is not forced into Edge runtime.

---

## 24. Vercel-specific checks

When deploying to Vercel, check:

- Environment variables exist in Vercel dashboard
- Production and preview environments are configured
- API routes are supported
- Build command works
- No local-only paths are used
- No secrets are required client-side
- No `.env.local` dependency exists in production
- Domain and email sender setup are compatible

If an email provider requires domain verification, document that clearly.

---

## 25. Testing checklist

Before completing any backend task, test or reason through:

- Valid submission
- Missing required fields
- Invalid email
- Invalid URL
- Empty message
- Very long message
- Honeypot spam submission
- Too many submissions
- Email provider failure
- Missing environment variable
- API route production compatibility
- Frontend receives expected response
- No raw server error leaks
- No secrets exposed
- TypeScript passes
- Build passes

If full testing cannot be performed, clearly state what was not tested.

---

## 26. Code quality rules

Backend code should be:

- Typed
- Small
- Modular
- Explicit
- Easy to read
- Easy to test
- Consistent with existing project conventions

Avoid:

- Large all-in-one route files
- Untyped request bodies
- Repeated validation logic
- Hidden magic values
- Hardcoded secrets
- Silent catch blocks
- Unclear error messages
- Unnecessary abstraction

---

## 27. Safe implementation order

When building a new backend feature, follow this order:

1. Inspect existing project structure
2. Identify existing backend patterns
3. Check dependencies
4. Define schema
5. Build server-side handler
6. Add email/database integration
7. Add spam/rate-limit protection
8. Connect frontend if needed
9. Add environment variable documentation
10. Test common success and failure paths
11. Check production deployment risks

Do not jump straight into coding without checking the existing architecture.

---

## 28. Final backend review checklist

Before finishing, confirm:

- The backend feature works for the intended user action
- Inputs are validated server-side
- Invalid inputs are rejected safely
- Spam protection exists
- Rate limiting is considered
- Secrets are server-only
- Environment variables are documented
- Errors are handled safely
- Email/database logic is reliable
- No private data is leaked
- API responses are predictable
- Production deployment will not break
- The code is not overengineered
- The implementation supports the website’s core job: making enquiries and contact actions reliable
