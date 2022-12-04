import { z } from "zod";

export const articleSchema = z.object({
  id: z.number(),
  name: z.string({}).min(5),
  teaser: z.string(),
  content: z.string(),
  url: z.string(),
});

export type Article = z.infer<typeof articleSchema>;
