import React from "react";
import useAuthors from "../hooks/useAuthors.tsx";
import Author from "../components/Author.tsx";

const Authors = () => {
  const { authors, loading, error } = useAuthors();

  if (loading) {
    return (
      <div className="min-h-96 mx-auto flex flex-col items-center gap-3">
        <div className="skeleton h-45 w-200"></div>
      </div>
    );
  }

  if (error) return <div>{error.message}</div>;

  if (authors.length === 0) return <div>No authors</div>;
  return (
    <main className=" flex flex-col   mx-auto gap-5 p-5">
      {authors.map((author) => (
        <Author {...author} key={author.author} />
      ))}
    </main>
  );
};

export default Authors;
