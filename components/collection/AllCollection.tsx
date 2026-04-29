"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/content/schema";

type Filter = "all" | "new" | "best";
type Sort = "curated" | "name" | "price-asc" | "price-desc";

export function AllCollection({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("curated");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (filter === "all") return true;
        if (filter === "new") return p.tag === "new";
        if (filter === "best") return p.tag === "best";
        return true;
      }),
    [products, filter],
  );

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.en.localeCompare(b.en));
    return list;
  }, [filtered, sort]);

  const FILTERS: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: products.length },
    {
      id: "new",
      label: "New",
      count: products.filter((p) => p.tag === "new").length,
    },
    {
      id: "best",
      label: "Best",
      count: products.filter((p) => p.tag === "best").length,
    },
  ];
  const SORTS: { id: Sort; label: string }[] = [
    { id: "curated", label: "Curated" },
    { id: "name", label: "A → Z" },
    { id: "price-asc", label: "Price ↑" },
    { id: "price-desc", label: "Price ↓" },
  ];

  return (
    <section className="cf-allcoll" data-screen-label="All Collection">
      <div className="cf-allcoll-toolbar reveal">
        <div className="cf-allcoll-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`cf-allcoll-filter ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              <span>{f.label}</span>
              <span className="cnt">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="cf-allcoll-sort">
          <span className="cf-allcoll-sort-label">Sort</span>
          <div className="cf-allcoll-sort-opts">
            {SORTS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`cf-allcoll-sort-btn ${sort === s.id ? "active" : ""}`}
                onClick={() => setSort(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="cf-allcoll-meta reveal">
        <div className="cf-allcoll-meta-left">
          <span>
            {sorted.length} {sorted.length === 1 ? "piece" : "pieces"}
          </span>
          <span className="dot">·</span>
          <span>handmade in Seoul</span>
        </div>
        <Link className="cf-allcoll-back" href="/#collection">
          <span className="arr">←</span>
          <span>back to home</span>
        </Link>
      </div>

      <div className="cf-allcoll-grid reveal-stagger" key={filter + sort}>
        {sorted.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="cf-allcoll-empty reveal">
          <p>
            <em>The garden is quiet here...</em>
          </p>
          <button
            type="button"
            className="cf-btn ghost"
            onClick={() => setFilter("all")}
          >
            show everything
          </button>
        </div>
      )}

      <div className="cf-allcoll-footer reveal">
        <div className="cf-allcoll-footer-line" />
        <div className="cf-allcoll-footer-text">
          <em>찾으시는 곰돌이가 없나요?</em>
          <br />
          나만의 곰돌이를 주문 제작해 드려요.
        </div>
        <Link className="cf-btn" href="/#custom">
          주문 제작 문의 →
        </Link>
      </div>
    </section>
  );
}
