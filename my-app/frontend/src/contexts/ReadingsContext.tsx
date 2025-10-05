import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/users.ts";
import readingListsService from "../services/readingLists.ts";
import { useAuthContext } from "../contexts/AuthContext.tsx";

type Reading = Record<string, Record<string, string>>;

interface ReadingsContext {
  readings: Reading;
  addToReadings: (blogId: string) => void;
  removeFromReadings: (blogId: string) => void;
  isInReadings: (blogId: string) => boolean;
  loading: boolean;
}

const ReadingsContext = createContext<ReadingsContext | null>(null);

export const ReadingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [readings, setReadings] = useState<Reading>({});

  const fetchReadings = async () => {
    if (!user) {
      setReadings({});
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await userService.getOne(user.userId);
      const readings = data.readings.reduce<Reading>((acc, val) => {
        return {
          ...acc,
          [val.id]: { readinglists: val.readinglists.id || "" },
        };
      }, {});

      setReadings(readings);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const addToReadings = async (blogId: string) => {
    try {
      await readingListsService.create(blogId);
      await fetchReadings();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromReadings = async (id: string) => {
    const readinglistId = readings[id].readinglists;
    try {
      await readingListsService.remove(readinglistId);
      await fetchReadings();
    } catch (error) {
      console.log(error);
    }
  };

  const isInReadings = (id: string) => {
    return Boolean(readings[id]);
  };

  useEffect(() => {
    fetchReadings();
  }, [user]);

  return (
    <ReadingsContext
      value={{
        isInReadings,
        removeFromReadings,
        addToReadings,
        readings,
        loading,
      }}
    >
      {children}
    </ReadingsContext>
  );
};

export const useReadingsContext = () => {
  const context = useContext(ReadingsContext);
  if (!context) {
    throw new Error("context not found");
  }

  return context;
};
