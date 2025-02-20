import blogData from "@/data/blogPosts.json";

export async function getAllPosts() {
  try {
    return blogData;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return blogData.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching post with slug: ${slug}`, error);
    return null;
  }
}
