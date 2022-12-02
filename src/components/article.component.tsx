import { component$ } from "@builder.io/qwik";
import { Article } from "~/model/article";

export type ArticleProps = {
  article: Article;
};
export default component$(({ article }: ArticleProps) => {
  return <h3>{article.name}</h3>;
});
