import PostCreateForm from "@/app/components/posts/post-create-form"
import { getPostsByTopicSlug } from "@/db/queries/posts";
import PostList from "@/app/components/posts/post-list";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-3xl font-bold">{slug}</h1>
        <PostList fetchData={() => getPostsByTopicSlug(slug)} />
      </div>

      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
