import { component$, PropFunction, useSignal } from "@builder.io/qwik";

export type CommentListProps = {
  comments: string[];
  onAdd$: PropFunction<(comment: string) => void>;
};

export default component$((props: CommentListProps) => {
  const addCommentSignal = useSignal("");
  return (
    <>
      {props.comments.length > 0 ? (
        props.comments.map((comment, i) => <div key={i}>{comment}</div>)
      ) : (
        <p>There are no comments yet.</p>
      )}

      <div class="flex flex-col max-w-md my-4">
        <h3>New Comment</h3>
        <textarea
          class="default"
          oninput$={(event) => {
            addCommentSignal.value = (event.target as HTMLInputElement).value;
          }}
        ></textarea>
        <button
          class="btn-primary my-2"
          onclick$={() => props.onAdd$(addCommentSignal.value)}
        >
          Add Comment
        </button>
      </div>
    </>
  );
});
