import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";

// Define the blog content directory
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  tags?: string[];
  slug: string;
  formattedDate: string;
};

export function getAllPosts(): PostMeta[] {
  // Get all files in the blog directory
  const files = fs.readdirSync(BLOG_DIR);

  // Process each file to extract metadata
  const posts = files
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => {
      const slug = path.basename(file, ".mdx");
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Extract frontmatter metadata
      const { data } = matter(fileContent);

      // Format the date for display
      const formattedDate = format(new Date(data.date), "MMMM dd, yyyy");

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || "",
        author: data.author || "",
        tags: data.tags || [],
        formattedDate,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): {
  meta: PostMeta;
  content: string;
} {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const formattedDate = format(new Date(data.date), "MMMM dd, yyyy");

  const meta: PostMeta = {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt || "",
    author: data.author || "",
    tags: data.tags || [],
    formattedDate,
  };

  return { meta, content };
}

export function getLatestPosts(count = 3): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, count);
}
