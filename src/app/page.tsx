import TopicCreateForm from "@/app/components/topics/topic-create-form";
import TopicList from "@/app/components/topics/topic-list";
import { Divider } from "@nextui-org/react";
import PostList from "@/app/components/posts/post-list";
import { getTopPosts } from "@/db/queries/posts";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-3xl font-bold">Top Posts</h1>
        <PostList fetchData={getTopPosts} />
      </div>

      <div className="border shadow p-3">
        <TopicCreateForm />
        <Divider className="my-2" />

        <h3 className="text-lg">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
