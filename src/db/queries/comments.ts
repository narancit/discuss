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
  console.log("I am called!")
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
