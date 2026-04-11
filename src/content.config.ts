import { defineCollection, z, type ImageFunction } from "astro:content";
import { glob } from "astro/loaders";

const blogSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    banner: image().optional(),
    imageTop: z
      .object({
        src: z.string(),
      })
      .optional(),
  });

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) => blogSchema({ image }),
});

const shortsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/shorts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    language: z.enum(["pt", "en"]).default("pt"),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  shorts: shortsCollection,
};
