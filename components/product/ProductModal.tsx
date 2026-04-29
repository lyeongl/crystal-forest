"use client";

import { useEffect } from "react";
import { useModal } from "@/lib/modal/store";
import { ProductDetail } from "./ProductDetail";

export function ProductModal() {
  const product = useModal((s) => s.product);
  const close = useModal((s) => s.close);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty("--scrollbar-w", `${scrollbarW}px`);
    document.addEventListener("keydown", onKey);
    document.body.classList.add("cf-modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("cf-modal-open");
      document.body.style.removeProperty("--scrollbar-w");
    };
  }, [product, close]);

  if (!product) return null;

  return (
    <div className="cf-modal-backdrop" onClick={close}>
      <div className="cf-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="cf-modal-close"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>
        <ProductDetail product={product} onAdded={close} />
      </div>
    </div>
  );
}
