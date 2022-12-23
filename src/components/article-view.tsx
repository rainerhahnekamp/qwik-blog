import { component$ } from "@builder.io/qwik";
import { Article } from "~/model/article";
import { marked } from "marked";

export type ArticleProps = {
  article: Article;
};
export default component$(({ article }: ArticleProps) => {
  const markdownContent = marked.parse(article.content);
  return (
    <>
      <h2>{article.name}</h2>
      <p dangerouslySetInnerHTML={markdownContent}></p>
    </>
  );
});
