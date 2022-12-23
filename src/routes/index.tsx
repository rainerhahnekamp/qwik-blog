import { component$, Resource } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useEndpoint } from "@builder.io/qwik-city";
import { Article } from "~/model/article";
import { PrismaClient } from "@prisma/client";
import ArticleComponent from "~/components/article-preview";

export const onGet: RequestHandler = async (): Promise<Article[]> => {
  const prisma = new PrismaClient();
  const dbArticles = await prisma.article.findMany();
  return Promise.all(
    dbArticles.map(async ({ id, name, content, teaser, url }) => ({
      id,
      name,
      content: await remark().process("#Hallo").then(String),
      teaser,
      url,
    }))
  );
};

export default component$(() => {
  const articlesResource = useEndpoint<Article[]>();

  return (
    <>
      <Resource
        value={articlesResource}
        onPending={() => <p>Loading Articles...</p>}
        onRejected={(reason) => (
          <>
            <p>There was an error loading your articles.</p>
            <pre>{reason}</pre>
          </>
        )}
        onResolved={(articles: Article[]) => (
          <>
            {articles.length ? (
              articles.map((article, ix) => (
                <ArticleComponent key={ix} article={article}></ArticleComponent>
              ))
            ) : (
              <p>
                There are no articles yet. <a href="/admin">Add Article</a>
              </p>
            )}
          </>
        )}
      ></Resource>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Blog",
  meta: [
    {
      name: "description",
      content: "Qwik Blog is a Blog implemented in Qwik",
    },
  ],
};
