import { db } from "@/db";
import Link from "next/link";
import paths from "@/paths";
import { Chip } from "@nextui-org/react";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const topicList = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color="warning" variant="bordered">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex flex-row flex-wrap py-2 gap-2">
        {topicList}
    </div>
  );
}
