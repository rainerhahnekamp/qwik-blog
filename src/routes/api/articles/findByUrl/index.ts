import { RequestHandler } from "@builder.io/qwik-city";
import { findArticleWithCommentsByUrl } from "~/server/articles";

export const onGet: RequestHandler = async ({ request }) => {
  console.log("on the server");
  const url = "test";
  // const articleUrl = params.url;
  const articleUrl = "test";

  if (!articleUrl) {
    throw new Error(`cannot parse ${url}`);
  }
  const article = await findArticleWithCommentsByUrl(articleUrl);
  if (!article) {
    throw new Error(`cannot find article with url ${articleUrl}`);
  }

  return article;
};
