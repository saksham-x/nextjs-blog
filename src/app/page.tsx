"use client";
import { useState, useEffect } from "react";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import { BlogPost } from "@/types";

const POSTS_PER_PAGE = 5;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null); // ✅ Track errors

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (err) {
        setError("Failed to load blog posts. Please try again later."); // ✅ Show user-friendly message
        console.error("Error loading posts:", err);
      }
    }
    fetchPosts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const displayedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Blog Posts</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mt-6 space-y-6">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => <BlogCard key={post.id} post={post} />)
        ) : (
          <p className="text-gray-500 text-center">No posts found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
