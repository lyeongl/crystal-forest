"use client";

import Image from "next/image";
import { useCart, cartTotal } from "@/lib/cart/store";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove } = useCart();
  const total = cartTotal(items);

  return (
    <>
      <aside className={`cf-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <button
          type="button"
          className="cf-drawer-close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          ×
        </button>
        <h3>
          <em>Your Basket</em>
        </h3>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cf-ink-soft)",
          }}
        >
          {items.length} {items.length === 1 ? "bear" : "bears"} in your little forest
        </div>
        <div className="cf-drawer-items">
          {items.length === 0 && (
            <div className="cf-drawer-empty">
              the forest is quiet...
              <br />
              pick a bear ♡
            </div>
          )}
          {items.map((it) => (
            <div className="cf-drawer-item" key={it.id}>
              <Image
                src={it.cover}
                alt=""
                width={72}
                height={72}
                style={{ objectFit: "cover", objectPosition: it.crop }}
              />
              <div>
                <div className="n">{it.en}</div>
                <div className="p">{it.name}</div>
                <div className="q">
                  <button type="button" onClick={() => setQty(it.id, -1)}>
                    −
                  </button>
                  <span>{it.qty}</span>
                  <button type="button" onClick={() => setQty(it.id, 1)}>
                    +
                  </button>
                  <button
                    type="button"
                    style={{ marginLeft: 12, fontSize: 10 }}
                    onClick={() => remove(it.id)}
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--cf-serif)",
                  fontStyle: "italic",
                }}
              >
                ₩ {(it.price * it.qty).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <>
            <div className="cf-drawer-total">
              <div className="l">Total</div>
              <div className="v">₩ {total.toLocaleString()}</div>
            </div>
            <a
              className="cf-btn"
              style={{ width: "100%", justifyContent: "center" }}
              href="https://instagram.com/crystal.forest.kr"
              target="_blank"
              rel="noreferrer"
            >
              인스타그램 DM으로 주문
            </a>
            <p
              style={{
                fontSize: 12,
                color: "var(--cf-ink-soft)",
                marginTop: 16,
                lineHeight: 1.7,
              }}
            >
              주문은 인스타그램 @crystal.forest.kr DM으로 이어져요. 장바구니 내역을 그대로
              보내드릴게요.
            </p>
          </>
        )}
      </aside>
      {open && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.2)",
            zIndex: 240,
          }}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
