import { useEffect, useState } from "react";
import userService from "../services/users.ts";
import type { UserDetails } from "../types.ts";
import { useReadingsContext } from "../contexts/ReadingsContext.tsx";

const useUser = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<UserDetails | null>(null);
  const { readings } = useReadingsContext();

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await userService.getOne(id);
      setUser(data);
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
    fetchUser();
  }, [readings]);

  return { loading, error, user, refetchUser: fetchUser };
};

export default useUser;
