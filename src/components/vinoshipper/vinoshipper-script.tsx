"use client";

import Script from "next/script";
import { useEffect, useCallback } from "react";

const ACCOUNT_ID = 1290;

export function VinoshipperScript() {
  const initVinoshipper = useCallback(() => {
    if (typeof window !== "undefined" && window.Vinoshipper) {
      window.Vinoshipper.init(ACCOUNT_ID, {
        cartButton: false,
        cartPosition: "end",
        addToCartStyle: false,
        autoRender: true,
      });
    }
  }, []);

  useEffect(() => {
    // If already loaded (e.g. back-navigation), init immediately
    if (typeof window !== "undefined" && window.Vinoshipper) {
      initVinoshipper();
    }
  }, [initVinoshipper]);

  return (
    <Script
      src="https://vinoshipper.com/injector/injector.js"
      strategy="afterInteractive"
      onLoad={initVinoshipper}
    />
  );
}
