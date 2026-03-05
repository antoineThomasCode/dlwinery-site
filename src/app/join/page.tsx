import { redirect } from "next/navigation";

export default function JoinRedirect() {
  redirect(
    "/wine-club?utm_source=tasting_room&utm_medium=qr&utm_campaign=table_tent#join"
  );
}
