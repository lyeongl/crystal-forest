"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  en: string;
  price: number;
  cover: string;
  crop: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  toast: string | null;
  add: (item: Omit<CartItem, "qty">) => void;
  setQty: (id: string, delta: number) => void;
  remove: (id: string) => void;
  setOpen: (open: boolean) => void;
  clearToast: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      toast: null,
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === item.id);
          const items = existing
            ? s.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
              )
            : [...s.items, { ...item, qty: 1 }];
          return { items, toast: `${item.name} 담았어요 ♡` };
        }),
      setQty: (id, delta) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
          ),
        })),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setOpen: (open) => set({ open }),
      clearToast: () => set({ toast: null }),
    }),
    {
      name: "cf-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((s, i) => s + i.qty, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((s, i) => s + i.price * i.qty, 0);
}
