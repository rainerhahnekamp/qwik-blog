import { Article } from "~/model/article";
import { PrismaClient } from "@prisma/client";

export async function loadArticlesFromDb(): Promise<Article[]> {
  const prisma = new PrismaClient();
  const dbArticles = await prisma.article.findMany();
  return dbArticles.map(toArticle);
}
export async function findArticleByUrl(url: string): Promise<Article | null> {
  const prisma = new PrismaClient();
  const dbArticle = await prisma.article.findFirst({ where: { url } });
  return dbArticle ? toArticle(dbArticle) : null;
}

export async function findArticleById(id: number): Promise<Article | null> {
  const prisma = new PrismaClient();
  const dbArticle = await prisma.article.findFirst({ where: { id } });
  return dbArticle ? toArticle(dbArticle) : null;
}

function toArticle(dbArticle: Article): Article {
  const { id, name, content, teaser, url } = dbArticle;
  return { id, name, content, teaser, url };
}
