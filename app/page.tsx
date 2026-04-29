import { Hero } from "@/components/hero/Hero";
import { Collection } from "@/components/collection/Collection";
import { About } from "@/components/sections/About";
import { Custom } from "@/components/sections/Custom";
import { Footer } from "@/components/sections/Footer";
import { RevealController } from "@/components/effects/Reveal";
import { getProducts } from "@/lib/content/products";

export default function Home() {
  const products = getProducts();
  return (
    <>
      <RevealController />
      <main>
        <Hero />
        <Collection products={products} headingStyle="editorial" />
        <About />
        <Custom />
      </main>
      <Footer />
    </>
  );
}
