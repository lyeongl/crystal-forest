"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const PALETTE_OPTS = [
  { id: "cream", label: "Cream Blossom", swatch: "#d77a92" },
  { id: "lavender", label: "Lavender Dream", swatch: "#a89bc0" },
  { id: "forest", label: "Forest Deep", swatch: "#3e5233" },
  { id: "honey", label: "Sunset Honey", swatch: "#d4a574" },
];
const OVERLAY_OPTS = [
  { id: "heavy", label: "진하게" },
  { id: "medium", label: "보통" },
  { id: "light", label: "연하게" },
  { id: "none", label: "없음" },
];
const CARD_OPTS = [
  { id: "rounded", label: "둥근" },
  { id: "angular", label: "각진" },
  { id: "polaroid", label: "폴라로이드" },
];
const FONT_OPTS = [
  { id: "cormorant-caveat", label: "Cormorant + Caveat" },
  { id: "playfair-dancing", label: "Playfair + Dancing" },
  { id: "ebgaramond-homemade", label: "EB Garamond + Homemade" },
];
const HEADING_OPTS = [
  { id: "classic", label: "A. 클래식" },
  { id: "editorial", label: "B. 에디토리얼" },
  { id: "myeongjo", label: "C. 명조 럭셔리" },
  { id: "bilingual", label: "D. 한·영 혼합" },
];

const DEFAULTS = {
  palette: "cream",
  overlay: "medium",
  cardstyle: "rounded",
  fontcombo: "cormorant-caveat",
  headingstyle: "editorial",
};

type Cfg = typeof DEFAULTS;

function Inner() {
  const search = useSearchParams();
  const enabled = search.get("tweaks") === "1";
  const [cfg, setCfg] = useState<Cfg>(DEFAULTS);

  useEffect(() => {
    if (!enabled) return;
    document.body.dataset.palette = cfg.palette;
    document.body.dataset.overlay = cfg.overlay;
    document.body.dataset.cardstyle = cfg.cardstyle;
    document.body.dataset.fontcombo = cfg.fontcombo;
    document.body.dataset.headingstyle = cfg.headingstyle;
  }, [cfg, enabled]);

  if (!enabled) return null;

  function set<K extends keyof Cfg>(k: K, v: Cfg[K]) {
    setCfg((c) => ({ ...c, [k]: v }));
  }

  return (
    <div className="cf-tweaks open">
      <h4>
        <em>Tweaks</em>
      </h4>
      <div className="sub">explore the forest</div>

      <Group label="Palette" isSwatch>
        {PALETTE_OPTS.map((o) => (
          <div
            key={o.id}
            className={`cf-tweak-swatch ${cfg.palette === o.id ? "active" : ""}`}
            title={o.label}
            style={{ background: o.swatch }}
            onClick={() => set("palette", o.id)}
          />
        ))}
      </Group>

      <Group label="덩쿨 오버레이">
        {OVERLAY_OPTS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`cf-tweak-btn ${cfg.overlay === o.id ? "active" : ""}`}
            onClick={() => set("overlay", o.id)}
          >
            {o.label}
          </button>
        ))}
      </Group>

      <Group label="카드 스타일">
        {CARD_OPTS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`cf-tweak-btn ${cfg.cardstyle === o.id ? "active" : ""}`}
            onClick={() => set("cardstyle", o.id)}
          >
            {o.label}
          </button>
        ))}
      </Group>

      <Group label="폰트 조합">
        {FONT_OPTS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`cf-tweak-btn ${cfg.fontcombo === o.id ? "active" : ""}`}
            onClick={() => set("fontcombo", o.id)}
          >
            {o.label}
          </button>
        ))}
      </Group>

      <Group label="Collection 제목 스타일">
        {HEADING_OPTS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`cf-tweak-btn ${cfg.headingstyle === o.id ? "active" : ""}`}
            onClick={() => set("headingstyle", o.id)}
          >
            {o.label}
          </button>
        ))}
      </Group>
    </div>
  );
}

function Group({
  label,
  children,
  isSwatch,
}: {
  label: string;
  children: React.ReactNode;
  isSwatch?: boolean;
}) {
  return (
    <div className="cf-tweak-group">
      <div className="cf-tweak-label">{label}</div>
      <div className="cf-tweak-opts" data-swatch={isSwatch || undefined}>
        {children}
      </div>
    </div>
  );
}

export function TweaksPanel() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
