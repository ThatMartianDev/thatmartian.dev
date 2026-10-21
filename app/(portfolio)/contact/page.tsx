import { createPageMetadata } from "@/src/helpers/metadata";
import ContactPage from "@/src/ui/pages/Contact/ContactPage";
import { Metadata } from "next";

export const metadata:Metadata = createPageMetadata(
  "Contact | ThatMartianDev",
  "Get in touch with Ahmed Mohammed about product development, full-stack engineering, AI integrations, or engineering opportunities.",
  "/contact",
);

export default function Page() {
  return <ContactPage />;
}
