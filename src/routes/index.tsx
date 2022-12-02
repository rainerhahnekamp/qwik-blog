import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import ArticleComponent from "~/components/article.component";
import { Article } from "~/model/article";

export default component$(() => {
  const articles = useStore<{ articles: Article[] }>({ articles: [] });
  return (
    <>
      <h1>Latest Articles</h1>
      {articles.articles.map((article, i) => (
        <ArticleComponent article={article}></ArticleComponent>
      ))}
      <button onClick$={() => (articles.articles = [{ name: "TypeScript" }])}>
        Load
      </button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
