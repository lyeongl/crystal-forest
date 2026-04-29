"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart/store";

export function CartToast() {
  const toast = useCart((s) => s.toast);
  const clearToast = useCart((s) => s.clearToast);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!toast) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => clearToast(), 1800);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [toast, clearToast]);

  if (!toast) return null;
  return <div className="cf-added-toast show">{toast}</div>;
}
