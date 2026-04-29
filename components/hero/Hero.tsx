"use client";

import { useEffect, useState } from "react";

const HERO_SLIDES = [
  { src: "/assets/bears/bear-01.jpg", pos: "center 35%" },
  { src: "/assets/bears/bear-02.jpg", pos: "center 40%" },
  { src: "/assets/bears/bear-03.jpg", pos: "center 30%" },
  { src: "/assets/bears/bear-04.jpg", pos: "center 40%" },
];

export type HeroSlideStyle = "crossfade" | "kenburns" | "vertical";

export function Hero({
  duration = 5,
  style = "crossfade",
}: {
  duration?: number;
  style?: HeroSlideStyle;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % HERO_SLIDES.length),
      duration * 1000,
    );
    return () => clearInterval(t);
  }, [duration]);

  function scrollToCollection() {
    const el = document.querySelector("#collection");
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
  }

  return (
    <section
      className="cf-hero-slideshow"
      data-style={style}
      data-screen-label="Hero"
    >
      <div className="cf-hero-stage">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`cf-hero-slide ${i === idx ? "is-active" : ""}`}
            style={{
              backgroundImage: `url(${s.src})`,
              backgroundPosition: s.pos,
            }}
          />
        ))}
        <div className="cf-hero-vignette" />
      </div>

      <div className="cf-hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`cf-hero-dot ${i === idx ? "is-active" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        className="cf-hero-scroll"
        onClick={scrollToCollection}
        aria-label="Scroll to collection"
      >
        <span className="cf-hero-scroll-label">Scroll</span>
        <span className="cf-hero-scroll-arrow">↓</span>
      </button>
    </section>
  );
}
