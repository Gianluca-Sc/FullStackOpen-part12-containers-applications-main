import type { BlogWithUser } from "../types.ts";
import Blog from "./Blog.tsx";

interface BlogsListProps {
  blogs: BlogWithUser[];
  loading: boolean;
  error: Error | null;
  updateBlog: (id: string, likes: number) => void;
  deleteBlog: (id: string) => void;
}

const BlogsList = ({
  blogs,
  loading,
  error,
  updateBlog,
  deleteBlog,
}: BlogsListProps) => {
  if (loading) {
    return (
      <div className="min-h-96 mx-auto flex flex-col items-center gap-3">
        <div className="skeleton h-45 w-200"></div>
        <div className="skeleton h-45 w-200"></div>
        <div className="skeleton h-45 w-200"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blog
            blog={blog}
            updateBlog={updateBlog}
            key={blog.id}
            deleteBlog={deleteBlog}
          />
        ))
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
};

export default BlogsList;
