import { $, component$, Resource, useSignal } from "@builder.io/qwik";
import { Article, articleSchema } from "~/model/article";
import ArticleForm, { ArticleFormData } from "~/components/article-form";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { findArticleById } from "~/server/articles";

export const onGet: RequestHandler = async ({ url }) => {
  const articleId = url.pathname.split("/").filter(Boolean).at(-1);
  if (!articleId) {
    throw new Error(`cannot parse ${url}`);
  }

  return await findArticleById(parseInt(articleId));
};

export default component$(() => {
  const articleResource = useEndpoint<Article>();

  const savedSignal = useSignal("");
  const removedSignal = useSignal(false);
  const save = $(async (formData: ArticleFormData & { id: number }) => {
    const { url } = await fetch("/api/articles", {
      method: "PUT",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => articleSchema.parse(res));
    savedSignal.value = url;
  });

  const remove = $(async (id: number) => {
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    removedSignal.value = true;
  });

  return (
    <>
      {removedSignal.value === false ? (
        <Resource
          value={articleResource}
          onResolved={(article) => (
            <>
              <ArticleForm
                article={article}
                onSubmit$={async (modifiedArticle) => {
                  await save({ ...modifiedArticle, id: article.id });
                }}
                onRemove$={async () => {
                  await remove(article.id);
                }}
              ></ArticleForm>
              {savedSignal.value ? (
                <>
                  <p>Article saved</p>
                  <a href={`/articles/${savedSignal.value}`}>View</a>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        ></Resource>
      ) : (
        <>
          <p>Article removed</p> <a href="/">Articles Overview</a>
        </>
      )}
    </>
  );
});
