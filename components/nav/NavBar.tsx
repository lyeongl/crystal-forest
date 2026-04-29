"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart, cartCount } from "@/lib/cart/store";

const INSTAGRAM_URL = "https://instagram.com/crystal.forest.kr";

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const count = mounted ? cartCount(items) : 0;

  return (
    <>
      <nav className="cf-nav">
        <Link href="/" className="cf-logo">
          CRYSTAL · FOREST
        </Link>
        <div className="cf-nav-links">
          <Link href="/#collection">Collection</Link>
          <Link href="/#about">About</Link>
          <Link href="/#custom">Custom</Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
        <div className="cf-nav-right">
          <button
            type="button"
            className={`cf-hamburger ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <button
            type="button"
            className="cf-cart"
            onClick={() => setOpen(true)}
            aria-label="Open basket"
          >
            <span className="cf-cart-label">♡ Basket</span>
            <span className="cf-cart-icon" aria-hidden="true">
              ♡
            </span>
            <span className="cf-cart-count">({count})</span>
          </button>
        </div>
      </nav>

      <div
        className={`cf-mobile-menu ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="cf-mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
          <div className="cf-mobile-menu-kicker">Menu</div>
          <Link href="/#collection" onClick={() => setMenuOpen(false)}>
            Collection
          </Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/#custom" onClick={() => setMenuOpen(false)}>
            Custom
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}
