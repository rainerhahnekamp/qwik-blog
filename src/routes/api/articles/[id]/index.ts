import { RequestHandler } from "@builder.io/qwik-city";
import { Article } from "~/model/article";
import { removeArticleFromDb } from "~/services/article-service";

export const onDelete: RequestHandler<Article> = async ({
  url,
}): Promise<void> => {
  const articleId = url.pathname.split("/").filter(Boolean).at(-1);
  if (!articleId) {
    throw new Error(`cannot parse ${url}`);
  }
  await removeArticleFromDb(parseInt(articleId));
};
