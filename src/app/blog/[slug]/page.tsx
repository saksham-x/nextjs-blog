import { getPostBySlug } from "@/lib/blog";
import { BlogPost } from "@/types";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post: BlogPost | null = await getPostBySlug(params.slug);

    if (!post) {
      return notFound();
    }

    return (
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-gray-500 text-sm">
          {format(new Date(post.date), "MMMM dd, yyyy")}
        </p>
        <div className="mt-6 text-gray-800">{post.content}</div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-red-500">
        <h1 className="text-2xl font-bold">Error Loading Post</h1>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
}
