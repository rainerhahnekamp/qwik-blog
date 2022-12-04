import { Article, articleSchema } from "~/model/article";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

export const addArticleRequestSchema = z.object({
  name: z.string(),
  url: z.string(),
  teaser: z.string(),
  content: z.string(),
});

export const saveArticleRequestSchema = addArticleRequestSchema.extend({
  id: z.number(),
});

export type AddArticleRequest = z.infer<typeof addArticleRequestSchema>;
export type SaveArticleRequest = z.infer<typeof saveArticleRequestSchema>;
export async function addArticleToDb(
  article: z.infer<typeof addArticleRequestSchema>
): Promise<Article> {
  const prisma = new PrismaClient();
  const dbArticle = await prisma.article.create({ data: article });
  return articleSchema.parse(dbArticle);
}

export async function saveArticleToDb(
  article: z.infer<typeof saveArticleRequestSchema>
): Promise<Article> {
  const prisma = new PrismaClient();

  const dbArticle = await prisma.article.update({
    where: { id: article.id },
    data: article,
  });
  return articleSchema.parse(dbArticle);
}

export async function removeArticleFromDb(id: number) {
  const prisma = new PrismaClient();
  await prisma.article.delete({ where: { id } });
}

export async function loadArticles(): Promise<Article[]> {
  const response = await fetch("/api/articles").then((res) => res.json());
  return z.array(articleSchema).parse(response);
}
