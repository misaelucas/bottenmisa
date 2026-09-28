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

export const collections = {
  blog: blogCollection,
};
