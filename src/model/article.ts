import { z } from "zod";

export const articleSchema = z.object({
  id: z.number(),
  name: z.string({}).min(5),
  content: z.string(),
});

export type Article = z.infer<typeof articleSchema>;

let id = 1;
const defaultArticle: Article = {
  id: id++,
  name: "Article",
  content: "",
};

export function createArticle(article: Partial<Article> = {}) {
  return { ...defaultArticle, ...article };
}
