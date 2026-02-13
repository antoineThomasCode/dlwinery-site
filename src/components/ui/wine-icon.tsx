export function WineIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 16.5V21.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.25 21.75H15.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.50002 2.25H16.5L18.9469 10.5281C19.0977 11.0467 19.0578 11.6021 18.8344 12.0938C18.2402 13.4085 17.2794 14.5239 16.0672 15.3063C14.855 16.0887 13.4428 16.5048 12 16.5048C10.5573 16.5048 9.1451 16.0887 7.93289 15.3063C6.72067 14.5239 5.75986 13.4085 5.16565 12.0938C4.94225 11.6021 4.90234 11.0467 5.05315 10.5281L7.50002 2.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.39062 9.40313C6.38438 8.86875 8.69063 8.1 12 9.75C15.525 11.5125 17.9156 10.5188 18.7875 10.0031" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
