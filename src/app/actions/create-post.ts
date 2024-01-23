"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { Post } from "@prisma/client";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import { redirect } from "next/navigation";

// zod schema
const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

// create post props
interface CreatePostProps {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostProps,
  formData: FormData
): Promise<CreatePostProps> {
  // parse zod
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // check session
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must login to add post."],
      },
    };
  }

  // find topic
  const topic = await db.topic.findFirst({
    where: { slug },
  });

  // check topic
  if (!topic) {
    return {
      errors: {
        _form: ["Topic does not exist."],
      },
    };
  }

  // create post
  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong."],
        },
      };
    }
  }

  // revalidate
  revalidatePath(paths.topicShow(slug));

  // redirect
  redirect(paths.postShow(slug, post.id));
}
