"use client";

import Image from "next/image";
import { Sparkles } from "@/components/effects/Sparkles";
import { useCart } from "@/lib/cart/store";
import type { Product } from "@/lib/content/schema";

const INSTAGRAM_URL = "https://instagram.com/crystal.forest.kr";

export function ProductDetail({
  product,
  onAdded,
}: {
  product: Product;
  onAdded?: () => void;
}) {
  const add = useCart((s) => s.add);

  function handleAdd() {
    add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      en: product.en,
      price: product.price,
      cover: product.coverPath,
      crop: product.crop,
    });
    onAdded?.();
  }

  return (
    <>
      <div className="cf-modal-img">
        <Image
          src={product.coverPath}
          alt={product.name}
          fill
          sizes="(max-width: 800px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: product.crop }}
          priority
        />
        <Sparkles count={8} seed={product.order} />
      </div>
      <div className="cf-modal-body">
        <h3>{product.en}</h3>
        <div className="cf-modal-en">
          · {product.name} · ₩ {product.price.toLocaleString()}
        </div>
        <p className="cf-modal-desc">{product.desc}</p>
        <div className="cf-modal-specs">
          {Object.entries(product.specs).map(([k, v]) => (
            <div className="spec" key={k}>
              <div className="spec-k">{k}</div>
              <div className="spec-v">{v}</div>
            </div>
          ))}
        </div>
        <div className="cf-modal-cta">
          <button type="button" className="cf-btn" onClick={handleAdd}>
            장바구니에 담기
          </button>
          <a
            className="cf-btn ghost"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            DM으로 문의
          </a>
        </div>
      </div>
    </>
  );
}
