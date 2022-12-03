import { RequestHandler } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Article } from "~/model/article";
import { z } from "zod";

const newArticleRequestSchema = z.object({
  name: z.string(),
  content: z.string(),
});

export const onGet: RequestHandler = async (): Promise<Article[]> => {
  const prisma = new PrismaClient();
  const dbArticles = await prisma.article.findMany();
  return dbArticles.map(({ id, name, content }) => ({ id, name, content }));
};

export const onPost: RequestHandler<number> = async ({ request }) => {
  const prisma = new PrismaClient();
  const newArticleRequest = newArticleRequestSchema.parse(await request.json());
  const article = await prisma.article.create({
    data: { ...newArticleRequest },
  });
  return article.id;
};
