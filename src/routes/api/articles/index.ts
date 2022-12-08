import { RequestHandler } from "@builder.io/qwik-city";
import { Article } from "~/model/article";
import {
  addArticleRequestSchema,
  addArticleToDb,
  saveArticleRequestSchema,
  saveArticleToDb,
} from "~/services/article-service";

export const onPost: RequestHandler<Article> = async ({ request }) => {
  const addArticleRequest = addArticleRequestSchema.parse(await request.json());
  return addArticleToDb(addArticleRequest);
};

export const onPut: RequestHandler<Article> = async ({
  request,
}): Promise<Article> => {
  const saveArticleRequest = saveArticleRequestSchema.parse(
    await request.json()
  );
  return saveArticleToDb(saveArticleRequest);
};
