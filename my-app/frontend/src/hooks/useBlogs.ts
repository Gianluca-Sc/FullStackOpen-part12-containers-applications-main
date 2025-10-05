import { useEffect, useState } from "react";
import blogsService from "../services/blogs.ts";
import type { BlogWithUser } from "../types.ts";

const useBlogs = (query: string | null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [blogs, setBlogs] = useState<BlogWithUser[]>([]);

  const fetchBlogs = async (query: string | null = null) => {
    try {
      setLoading(true);
      setError(null);

      const data = await blogsService.getAll(query);
      setBlogs(data);
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
    fetchBlogs(query);
  }, [query]);

  return { loading, error, blogs, setBlogs, refetchBlogs: fetchBlogs };
};

export default useBlogs;
