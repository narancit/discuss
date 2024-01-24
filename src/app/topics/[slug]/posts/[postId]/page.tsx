import Link from "next/link";
import PostShow from "@/app/components/posts/post-show";
import PostShowLoading from "@/app/components/posts/post-show-loading";
import CommentList from "@/app/components/comments/comment-list";
import CommentCreateForm from "@/app/components/comments/comment-create-form";
import paths from "@/paths";
import { Suspense } from "react";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
