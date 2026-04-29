import type { Metadata } from "next";
import { AllCollection } from "@/components/collection/AllCollection";
import { Footer } from "@/components/sections/Footer";
import { RevealController } from "@/components/effects/Reveal";
import { getProducts } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Crystal Forest의 모든 곰돌이. 봄·여름 2026 컬렉션, 9개의 손으로 꿴 피스.",
};

export default function CollectionPage() {
  const products = getProducts();
  return (
    <>
      <RevealController />
      <main>
        <AllCollection products={products} />
      </main>
      <Footer />
    </>
  );
}
