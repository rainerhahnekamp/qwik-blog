import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const addCommentSchema = z.object({
  articleId: z.number(),
  comment: z.string(),
});

export type AddComment = z.infer<typeof addCommentSchema>;
export const commentDb = {
  async add(addComment: AddComment) {
    const prisma = new PrismaClient();
    await prisma.comment.create({ data: addComment });
  },
};
