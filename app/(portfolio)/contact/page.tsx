import type { Metadata } from "next";
import ContactPage from "@/src/ui/pages/Contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | ThatMartianDev",
  description:
    "Get in touch with Ahmed Mohammed about product development, full-stack engineering, AI integrations, or engineering opportunities.",
};

export default function Page() {
  return <ContactPage />;
}
