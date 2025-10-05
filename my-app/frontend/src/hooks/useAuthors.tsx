import { useEffect, useState } from "react";
import authorService from "../services/authors.tsx";
import type { Author } from "../types.ts";

const useAuthors = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await authorService.getAll();
      setAuthors(data);
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
    fetchAuthors();
  }, []);

  return { loading, error, authors };
};

export default useAuthors;
