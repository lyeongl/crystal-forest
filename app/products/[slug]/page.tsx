import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getProductSlugs } from "@/lib/content/products";
import { ProductDetail } from "@/components/product/ProductDetail";
import { Footer } from "@/components/sections/Footer";

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: `${product.en} · ${product.name}`,
    description: product.poem,
    openGraph: {
      title: `${product.en} · ${product.name}`,
      description: product.poem,
      images: [{ url: product.coverPath }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.en} · ${product.name}`,
    description: product.poem,
    image: product.coverPath,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px 16px",
          }}
        >
          <Link
            href="/#collection"
            className="cf-allcoll-back"
            style={{ marginBottom: 24 }}
          >
            <span className="arr">←</span>
            <span>back to collection</span>
          </Link>
        </div>
        <div
          className="cf-modal"
          style={{ animation: "none", margin: "0 auto" }}
        >
          <ProductDetail product={product} />
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
