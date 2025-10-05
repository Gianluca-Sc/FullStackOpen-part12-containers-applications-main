import { useEffect, useState } from "react";
import blogsService from "../services/blogs.ts";
import type { BlogWithUser } from "../types.ts";

const useBlog = (id: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [blog, setBlog] = useState<BlogWithUser | null>(null);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await blogsService.getOne(id);
      setBlog(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  return { loading, error, blog, refetchBlog: fetchBlog, setBlog };
};

export default useBlog;
