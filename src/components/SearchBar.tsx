"use client";
import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={query}
      onChange={handleChange}
      className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
    />
  );
}
