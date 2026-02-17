import type { Metadata } from "next";
import ContactPage from "./client-page";

export const metadata: Metadata = {
  title: "Contact Us — Visit, Call, or Send a Message",
  description:
    "Get in touch with Domaine LeSeurre Winery. Located at 9485 Route 76, Hammondsport, NY. Open daily 10 AM – 6 PM. Call (607) 569-3299 or send us a message.",
  openGraph: {
    title: "Contact Us | Domaine LeSeurre",
    description:
      "Visit Domaine LeSeurre on Keuka Lake. Open daily 10 AM – 6 PM. 9485 Route 76, Hammondsport, NY 14840.",
  },
};

export default function Page() {
  return <ContactPage />;
}
