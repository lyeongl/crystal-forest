import { z } from "zod";

export const ProductFrontmatter = z.object({
  id: z.string(),
  order: z.number().int(),
  name: z.string(),
  en: z.string(),
  price: z.number().int().nonnegative(),
  tag: z.enum(["new", "best"]).nullable().default(null),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  crop: z.string(),
  poem: z.string(),
  cover: z.string(),
  specs: z.record(z.string(), z.string()),
  publishedAt: z.coerce.date(),
});

export type ProductFrontmatter = z.infer<typeof ProductFrontmatter>;

export type Product = ProductFrontmatter & {
  desc: string;
  slug: string;
  coverPath: string;
};
