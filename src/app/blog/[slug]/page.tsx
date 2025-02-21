"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { BlogPost } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

export default function BlogDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) {
      async function fetchPost() {
        const fetchedPost = await getPostBySlug(params.slug as string);
        setPost(fetchedPost);
        setLoading(false);
      }
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [params]);

  if (loading)
    return <p className="text-center text-gray-500">Loading post...</p>;

  if (!post)
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        Post not found.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="bg-gradient-to-br from-blue-100 to-gray-50 p-6 rounded-lg shadow-md">
        <p className="text-sm text-gray-500">
          {format(new Date(post.date), "MMMM dd, yyyy")}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">{post.title}</h1>
      </div>
      <div className="mt-6 text-gray-800 leading-relaxed">{post.content}</div>
      <div className="mt-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
