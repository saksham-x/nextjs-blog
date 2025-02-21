"use client";
import Link from "next/link";
import { format } from "date-fns";
import { BlogPost } from "@/types";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-gray-50 p-6 shadow-md transition hover:shadow-xl cursor-pointer">
        <p className="text-xs text-gray-500">
          {format(new Date(post.date), "MMMM dd, yyyy")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-gray-900 transition duration-300 group-hover:text-gray-800">
          {post.title}
        </h2>
        <p className="mt-2 text-gray-700 leading-relaxed">{post.summary}</p>
        <div className="mt-4 flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-300">
          Read More <ArrowRightIcon className="ml-1 h-4 w-4" />
        </div>
        <div className="absolute inset-0 bg-white opacity-10 transition duration-300 group-hover:opacity-20"></div>
      </div>
    </Link>
  );
}
