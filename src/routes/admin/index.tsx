import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { articleSchema } from "~/model/article";
import ArticleForm, { ArticleFormData } from "~/components/article-form";

export default component$(() => {
  const emptyArticle: ArticleFormData = {
    name: "",
    content: "",
    url: "",
    teaser: "",
  };

  const articleStore = useStore({ id: 0, url: "" });
  const submit = $(async (formData: ArticleFormData) => {
    const article = await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => articleSchema.parse(res));
    articleStore.id = article.id;
    articleStore.url = article.url;
  });

  return (
    <>
      <h2>Add Article</h2>
      {!articleStore.id ? (
        <ArticleForm
          article={emptyArticle}
          onSubmit$={async (article) => {
            await submit(article);
          }}
        ></ArticleForm>
      ) : (
        <div>
          <p>Article saved</p>
          <a href={`/articles/${articleStore.url}`}>View</a>{" "}
          <a href={`/admin/${articleStore.id}`}>Edit</a>{" "}
        </div>
      )}
    </>
  );
});
