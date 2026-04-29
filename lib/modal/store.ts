"use client";

import { create } from "zustand";
import type { Product } from "@/lib/content/schema";

interface ModalState {
  product: Product | null;
  open: (product: Product) => void;
  close: () => void;
}

export const useModal = create<ModalState>((set) => ({
  product: null,
  open: (product) => set({ product }),
  close: () => set({ product: null }),
}));
