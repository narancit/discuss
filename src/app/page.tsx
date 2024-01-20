import TopicCreateForm from "@/app/components/topics/topic-create-form";

export default function Home() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Top Posts</h1>
      <TopicCreateForm />
    </div>
  );
}
