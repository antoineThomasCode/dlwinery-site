"use client";

import { useEffect } from "react";

export function VinoshipperAvailable({ className }: { className?: string }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Vinoshipper?.render) {
      window.Vinoshipper.render();
    }
  }, []);

  return <div className={`vs-available ${className ?? ""}`} />;
}
