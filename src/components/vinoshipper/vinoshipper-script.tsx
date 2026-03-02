"use client";

import { useEffect } from "react";

const ACCOUNT_ID = 1290;

export function VinoshipperScript() {
  useEffect(() => {
    // Prevent double-init
    if (document.getElementById("vs-injector-script")) return;

    // 1. Register the event listener BEFORE loading the script (per docs)
    window.document.addEventListener(
      "vinoshipper:loaded",
      () => {
        window.Vinoshipper.init(ACCOUNT_ID, {
          cartButton: false,
          cartPosition: "end",
          addToCartStyle: true,
          autoRender: true,
          debug: false,
        });
      },
      false
    );

    // 2. Inject the script
    const script = document.createElement("script");
    script.id = "vs-injector-script";
    script.src = "https://vinoshipper.com/injector/index.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
