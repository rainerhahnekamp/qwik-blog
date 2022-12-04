import { component$ } from "@builder.io/qwik";
import { Article } from "~/model/article";

export type ArticleProps = {
  article: Article;
};
export default component$(({ article }: ArticleProps) => {
  return (
    <div>
      <h2>{article.name}</h2>
      <p>{article.teaser}</p>
      <a href={`/articles/${article.url}`}>View</a>
    </div>
  );
});
