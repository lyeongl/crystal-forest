"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/content/schema";
import { ProductDetail } from "./ProductDetail";

export function ProductModal({ product }: { product: Product }) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
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
  }, [router]);

  return (
    <div className="cf-modal-backdrop" onClick={() => router.back()}>
      <div className="cf-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="cf-modal-close"
          onClick={() => router.back()}
          aria-label="Close"
        >
          ×
        </button>
        <ProductDetail product={product} onAdded={() => router.back()} />
      </div>
    </div>
  );
}
