import { useNavigate, useParams } from "react-router";
import useBlog from "../hooks/useBlog.tsx";
import blogsService from "../services/blogs.ts";
import Blog from "../components/Blog.tsx";

const SingleBlog = () => {
  const { id } = useParams();

  const { loading, error, blog, refetchBlog } = useBlog(id);
  const navigate = useNavigate();

  const updateBlog = async (id: string, likes: number) => {
    await blogsService.updateLikes(id, likes + 1);
    await refetchBlog();
  };

  const deleteBlog = async (id: string) => {
    await blogsService.deleteBlog(id);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-96 mx-auto flex flex-col items-center gap-3">
        <div className="skeleton h-45 w-200"></div>
      </div>
    );
  }

  if (error) return <div>{error.message}</div>;

  return (
    <>
      {blog ? (
        <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      ) : (
        <div>No blog found</div>
      )}
    </>
  );
};

export default SingleBlog;
