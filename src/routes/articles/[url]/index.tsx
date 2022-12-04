import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Article } from "~/model/article";
import { findArticleByUrl } from "~/server/articles";
import ArticleView from "~/components/article-view";

export const onGet: RequestHandler = async ({ url }) => {
  const articleUrl = url.pathname.split("/").filter(Boolean).at(-1);
  if (!articleUrl) {
    throw new Error(`cannot parse ${url}`);
  }

  return await findArticleByUrl(articleUrl);
};

export default component$(() => {
  const articleResource = useEndpoint<Article>();

  return (
    <Resource
      value={articleResource}
      onResolved={(article) => (
        <>
          <p>
            <a href={`/`} class="pr-4">
              Back
            </a>
            <a href={`/admin/${article.id}`}>Edit</a>
          </p>
          <ArticleView article={article} />
        </>
      )}
    ></Resource>
  );
});
