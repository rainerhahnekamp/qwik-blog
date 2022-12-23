import { Article } from "~/model/article";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

type DbArticle = Prisma.ArticleGetPayload<{}>;
type ArticleWithComments = Article & { comments: string[] };

export async function loadArticlesFromDb(): Promise<Article[]> {
  const prisma = new PrismaClient();
  const dbArticles: DbArticle[] = await prisma.article.findMany({});
  return dbArticles.map(toArticle);
}
export async function findArticleWithCommentsByUrl(
  url: string
): Promise<ArticleWithComments | null> {
  const prisma = new PrismaClient();
  const dbArticle = await prisma.article.findFirst({
    where: { url },
    include: { comments: true },
  });

  return dbArticle
    ? {
        ...toArticle(dbArticle),
        comments: dbArticle.comments.map((comment) => comment.comment),
      }
    : null;
}

export async function findArticleById(id: number): Promise<Article | null> {
  const prisma = new PrismaClient();
  const dbArticle = await prisma.article.findFirst({ where: { id } });
  return dbArticle ? toArticle(dbArticle) : null;
}

function toArticle(dbArticle: DbArticle): Article {
  const { id, name, content, teaser, url } = dbArticle;
  return {
    id,
    name,
    content,
    teaser,
    url,
  };
}
