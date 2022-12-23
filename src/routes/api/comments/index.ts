import { RequestHandler } from "@builder.io/qwik-city";
import { addCommentSchema, commentDb } from "~/server/comments";

export const onPost: RequestHandler = async ({ request }) => {
  const addComment = addCommentSchema.parse(await request.json());
  await commentDb.add(addComment);
};
