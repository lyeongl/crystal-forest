import { ProductCard } from "./ProductCard";
import { CollectionMore } from "./CollectionMore";
import type { Product } from "@/lib/content/schema";

export type HeadingStyle = "classic" | "editorial" | "myeongjo" | "bilingual";

function Heading({ style }: { style: HeadingStyle }) {
  if (style === "editorial") return <div className="hs-editorial" />;
  if (style === "myeongjo") {
    return (
      <div className="hs-myeongjo">
        <div className="kicker reveal">花の名前 · the garden</div>
      </div>
    );
  }
  if (style === "bilingual") {
    return (
      <div className="hs-bilingual">
        <h2 className="reveal">
          <em>A garden</em>
          <br />
          <em>of tiny</em> <span className="and">&amp;</span> <em>bears</em>
        </h2>
      </div>
    );
  }
  return (
    <div>
      <div className="kicker script reveal">the garden of bears</div>
    </div>
  );
}

export function Collection({
  products,
  headingStyle = "editorial",
}: {
  products: Product[];
  headingStyle?: HeadingStyle;
}) {
  return (
    <section className="cf-section" id="collection" data-screen-label="Collection">
      <div className="cf-section-head" data-hs={headingStyle}>
        <Heading style={headingStyle} />
        <div className="meta reveal">
          Spring — Summer 2026
          <br />
          NINE PIECES · HANDMADE
        </div>
      </div>

      <div className="cf-allcoll-grid reveal-stagger">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>

      <CollectionMore />
    </section>
  );
}
