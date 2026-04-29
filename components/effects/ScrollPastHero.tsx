"use client";

import { useEffect } from "react";

export function ScrollPastHero() {
  useEffect(() => {
    function onScroll() {
      const past = window.scrollY > window.innerHeight * 0.85;
      document.body.classList.toggle("cf-past-hero", past);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
