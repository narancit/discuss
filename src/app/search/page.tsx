import { redirect } from "next/navigation";
import PostList from "@/app/components/posts/post-list";
import { getPostsBySearchTerm } from "@/db/queries/posts";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;

  if (!term) redirect("/");

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-3xl font-bold">Search: {term}</h1>
        <PostList fetchData={() => getPostsBySearchTerm(term)} />
      </div>
    </div>
  );
}
