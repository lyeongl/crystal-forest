"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "@/components/effects/Sparkles";
import type { Product } from "@/lib/content/schema";

export function ProductCard({
  product,
  index,
  scroll = false,
}: {
  product: Product;
  index: number;
  scroll?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      scroll={scroll}
      prefetch={true}
      className="cf-allcoll-card"
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
    </Link>
  );
}
