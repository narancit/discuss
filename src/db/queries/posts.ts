import { Post } from "@prisma/client";
import { db } from "@/db";

export type GetPostsByTopicSlugProps = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export function getPostsByTopicSlug(
  slug: string
): Promise<GetPostsByTopicSlugProps[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
