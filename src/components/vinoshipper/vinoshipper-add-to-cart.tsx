"use client";

import { useEffect, useRef } from "react";

interface VinoshipperAddToCartProps {
  productId: string;
  className?: string;
}

export function VinoshipperAddToCart({ productId, className }: VinoshipperAddToCartProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-render Vinoshipper components after SPA navigation
    if (typeof window !== "undefined" && window.Vinoshipper?.render) {
      window.Vinoshipper.render();
    }
  }, [productId]);

  return (
    <div
      ref={ref}
      className={`vs-add-to-cart ${className ?? ""}`}
      data-vs-product-id={productId}
      data-vs-include-qty="true"
      data-vs-product-units="Bottles"
    />
  );
}
