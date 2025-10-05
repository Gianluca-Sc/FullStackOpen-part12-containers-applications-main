import { Plus } from "lucide-react";
import BlogsFilter from "../components/BlogsFilter.tsx";
import BlogsList from "../components/BlogsList.tsx";

import useBlogs from "../hooks/useBlogs.ts";
import blogsService from "../services/blogs.ts";

import { Link, useSearchParams } from "react-router";
import { useAuthContext } from "../contexts/AuthContext.tsx";

const Home = () => {
  const { user } = useAuthContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const { blogs, loading, error, setBlogs, refetchBlogs } = useBlogs(
    searchParams.get("search")
  );

  const updateBlog = async (id: string, likes: number) => {
    try {
      const updatedBlog = await blogsService.updateLikes(id, likes + 1);
      const newBlogs = blogs
        .map((blog) => (blog.id === id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      await blogsService.deleteBlog(id);
      await refetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const value = formData.get("search") as string;

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className=" flex flex-col  min-w-96 max-w-200 mx-auto">
      <div className="flex justify-end gap-10 mb-5  ">
        <BlogsFilter
          handlesubmit={handlesubmit}
          searchParams={searchParams}
          loading={loading}
        />
        {user && (
          <button className="btn btn-primary w">
            <Link
              to="/blogs/create"
              className="flex items-center justify-around gap-2"
            >
              <span>Add blog</span>
              <Plus />
            </Link>
          </button>
        )}
      </div>
      <BlogsList
        blogs={blogs}
        loading={loading}
        error={error}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    </main>
  );
};

export default Home;
