import type { Comment } from "@prisma/client";
import { db } from "@/db";
// memoization
import { cache } from "react";

export type GetCommentsByPostIdProps = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export const getCommentsByPostId = cache((
  postId: string
): Promise<GetCommentsByPostIdProps[]> => {
  return db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
})
