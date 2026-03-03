import type { Metadata } from "next";
import MemberPage from "./client-page";

export const metadata: Metadata = {
  title: "Member Area — LeSeurre Family Club",
  description:
    "Access your LeSeurre Family Club dashboard. View shipments, order history, and manage your membership at Domaine LeSeurre.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MemberPage />;
}
