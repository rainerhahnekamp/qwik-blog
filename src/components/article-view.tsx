import { component$ } from "@builder.io/qwik";
import { Article } from "~/model/article";

export type ArticleProps = {
  article: Article;
};
export default component$(({ article }: ArticleProps) => {
  return (
    <>
      <h2>{article.name}</h2>
      <p>{article.content}</p>
    </>
  );
});
