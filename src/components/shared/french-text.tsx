export function FrenchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-heading italic text-gold-gradient ${className}`}>
      {children}
    </span>
  );
}
