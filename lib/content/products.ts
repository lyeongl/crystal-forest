import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ProductFrontmatter, type Product } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "products");

let _cache: Product[] | null = null;

function loadAll(): Product[] {
  if (_cache) return _cache;
  if (!fs.existsSync(CONTENT_DIR)) {
    _cache = [];
    return _cache;
  }
  const dirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const products: Product[] = dirs.map((dir) => {
    const file = path.join(CONTENT_DIR, dir, "index.mdx");
    if (!fs.existsSync(file)) {
      throw new Error(
        `Missing index.mdx in content/products/${dir}. Each product folder needs an index.mdx file.`,
      );
    }
    const raw = fs.readFileSync(file, "utf8");
    const parsed = matter(raw);
    const fm = ProductFrontmatter.safeParse(parsed.data);
    if (!fm.success) {
      throw new Error(
        `Invalid frontmatter in content/products/${dir}/index.mdx:\n${fm.error.issues
          .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
          .join("\n")}`,
      );
    }
    const cover = fm.data.cover.replace(/^\.\//, "");
    return {
      ...fm.data,
      desc: parsed.content.trim(),
      slug: fm.data.id,
      coverPath: `/products/${dir}/${cover}`,
    };
  });

  products.sort((a, b) => a.order - b.order);
  _cache = products;
  return _cache;
}

export function getProducts(): Product[] {
  return loadAll();
}

export function getProduct(slug: string): Product | undefined {
  return loadAll().find((p) => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return loadAll().map((p) => p.slug);
}
