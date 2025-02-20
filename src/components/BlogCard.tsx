import Link from "next/link";
import { format } from "date-fns";
import { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h2 className="text-2xl font-bold mb-2">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-500 text-sm">
        {format(new Date(post.date), "MMMM dd, yyyy")}
      </p>
      <p className="text-gray-700 mt-2">{post.summary}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="text-blue-500 hover:underline mt-3 block"
      >
        Read More →
      </Link>
    </div>
  );
}
