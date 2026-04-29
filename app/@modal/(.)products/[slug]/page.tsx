import { notFound } from "next/navigation";
import { getProduct } from "@/lib/content/products";
import { ProductModal } from "@/components/product/ProductModal";

export default async function InterceptedProduct({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductModal product={product} />;
}
