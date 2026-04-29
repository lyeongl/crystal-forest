"use client";

import Image from "next/image";
import { Sparkles } from "@/components/effects/Sparkles";
import { useModal } from "@/lib/modal/store";
import type { Product } from "@/lib/content/schema";

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const open = useModal((s) => s.open);

  return (
    <button
      type="button"
      className="cf-allcoll-card"
      onClick={() => open(product)}
    >
      {product.tag && (
        <span className="tag">{product.tag === "new" ? "new ♡" : "best"}</span>
      )}
      <div className="cf-allcoll-card-img">
        <Image
          src={product.coverPath}
          alt={product.name}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: product.crop }}
        />
        <Sparkles count={5} seed={index} />
      </div>
      <div className="cf-allcoll-card-meta">
        <div className="cf-allcoll-card-poem">{product.poem}</div>
        <div className="cf-allcoll-card-row">
          <div>
            <div className="cf-allcoll-card-name">{product.en}</div>
            <div className="cf-allcoll-card-en">{product.name}</div>
          </div>
          <div className="cf-allcoll-card-price">
            ₩ {product.price.toLocaleString()}
          </div>
        </div>
      </div>
    </button>
  );
}
