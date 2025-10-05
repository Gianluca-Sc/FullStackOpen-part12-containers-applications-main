import { useState } from "react";

import blogsService from "../services/blogs.ts";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const author = formData.get("author") as string;
    const url = formData.get("url") as string;
    const title = formData.get("title") as string;
    const year = parseInt(formData.get("year") as string);

    const blogObject = {
      author,
      url,
      title,
      year,
    };

    try {
      await blogsService.create(blogObject);
      navigate("/");
    } catch (error) {
      console.log(error, error instanceof Error);

      if (error instanceof AxiosError) {
        return setError(error.response?.data.error);
      }
      if (error instanceof Error) {
        return setError(error.message);
      }

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row  items-center justify-center">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            className="input"
            placeholder="Title"
          />

          <label className="label">Url</label>
          <input type="text" name="url" className="input" placeholder="url" />

          <label className="label">Year</label>
          <input
            type="number"
            name="year"
            className="input"
            placeholder="year"
          />

          <label className="label">Author</label>
          <input name="author" className="input" placeholder="Author" />
          {error !== null && (
            <p className="text-center text-error p-2">{error}</p>
          )}
          <button className="btn btn-neutral mt-4" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              <span>Create</span>
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateBlog;
