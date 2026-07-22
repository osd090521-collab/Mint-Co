import type { Metadata } from "next";
import { IntakeWizard } from "./IntakeWizard";

export const metadata: Metadata = {
  title: "Free audit",
  description:
    "Tell us about your business and we'll reply with a short, honest write-up — how you look online right now, where you're losing customers, and the two or three things we'd fix first. Free, no obligation.",
  alternates: { canonical: "/free-audit" },
  robots: { index: true, follow: true },
};

export default function FreeAuditPage() {
  return (
    <main id="main" className="flex-1">
      <IntakeWizard />
    </main>
  );
}
