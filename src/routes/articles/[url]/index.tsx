import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Article } from "~/model/article";
import ArticleView from "~/components/article-view";
import CommentList from "~/components/comment/comment-list";
import { AddComment } from "~/server/comments";
import { isServer } from "@builder.io/qwik/build";

export type ArticleWithComments = Article & { comments: string[] };

export default component$(() => {
  if (isServer) {
    return <p>On the server</p>;
  }
  return <p>On the client</p>;

  const url = useLocation().params.url;
  const loadSignal = useSignal(1);
  const articleResource = useResource$<ArticleWithComments>(
    async ({ track }) => {
      // track(() => loadSignal.value);
      const article = fetch(`/api/articles/findByUrl?url=${url}`).then((res) =>
        res.json()
      );
      return article;
    }
  );

  const addComment = $(async (addComment: AddComment) => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(addComment),
    });
  });

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
          <CommentList
            comments={article.comments}
            onAdd$={async (comment) =>
              await addComment({ articleId: article.id, comment })
            }
          ></CommentList>
        </>
      )}
    ></Resource>
  );
});
