"use client";

import { useEffect } from "react";

export function RevealController() {
  useEffect(() => {
    const shown = new WeakSet<Element>();
    function revealEl(el: Element) {
      if (shown.has(el)) return;
      shown.add(el);
      el.classList.add("in");
      setTimeout(() => el.setAttribute("data-cf-shown", "1"), 1100);
    }
    function catchUp() {
      const vh = window.innerHeight || 800;
      document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
        if (shown.has(el)) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) revealEl(el);
      });
    }
    catchUp();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) revealEl(e.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -5% 0px" },
    );
    document
      .querySelectorAll(".reveal, .reveal-stagger")
      .forEach((el) => io.observe(el));
    window.addEventListener("scroll", catchUp, { passive: true });
    window.addEventListener("resize", catchUp);
    const reapply = new MutationObserver((muts) => {
      for (const m of muts) {
        const el = m.target as Element;
        if (
          el.getAttribute &&
          el.getAttribute("data-cf-shown") === "1" &&
          !el.classList.contains("in")
        ) {
          el.classList.add("in");
        }
      }
    });
    reapply.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    });
    const interval = setInterval(catchUp, 600);
    return () => {
      io.disconnect();
      reapply.disconnect();
      window.removeEventListener("scroll", catchUp);
      window.removeEventListener("resize", catchUp);
      clearInterval(interval);
    };
  }, []);
  return null;
}
