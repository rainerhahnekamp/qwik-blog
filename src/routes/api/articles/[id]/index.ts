import { RequestHandler } from "@builder.io/qwik-city";
import { Article } from "~/model/article";
import { removeArticleFromDb } from "~/services/article-service";

export const onDelete: RequestHandler<Article> = async ({
  params,
  url,
}): Promise<void> => {
  const articleId = params.id;
  if (!articleId) {
    throw new Error(`cannot parse ${url}`);
  }
  await removeArticleFromDb(parseInt(articleId));
};
