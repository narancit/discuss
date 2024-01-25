import { Post } from "@prisma/client";
import { db } from "@/db";

export type GetPostsByTopicSlugProps = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export function getPostsBySearchTerm(
  term: string
): Promise<GetPostsByTopicSlugProps[]> {
  return db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
  });
}

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

export function getTopPosts(): Promise<GetPostsByTopicSlugProps[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}
