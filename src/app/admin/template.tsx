// Override root template to skip luxury animations on admin pages
export default function AdminTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
