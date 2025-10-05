import { Link } from "react-router";
import { type BlogWithUser } from "../types.ts";
import { Calendar, ExternalLink, Heart, User, X } from "lucide-react";
import { useAuthContext } from "../contexts/AuthContext.tsx";
import { useState } from "react";
import { useReadingsContext } from "../contexts/ReadingsContext.tsx";
import BookmarkButton from "./BookmarkButton.tsx";

interface BlogProps {
  blog: BlogWithUser;
  updateBlog: (id: string, likes: number) => void;
  deleteBlog: (id: string) => void;
}

const Blog = ({ blog, updateBlog, deleteBlog }: BlogProps) => {
  const { user } = useAuthContext();
  const {} = useReadingsContext();
  const [showAlert, setShowAlert] = useState(false);

  const isOwner = blog.user.username === user?.username;

  return (
    <div className="card min-w-200 shadow-sm px-5 pb-7 bg-base-300">
      <div className="card-body">
        {isOwner &&
          (showAlert ? (
            <>
              <div
                role="alert"
                className="alert alert-vertical sm:alert-horizontal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info h-6 w-6 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Are you sure to delete this blog?</span>
                <div>
                  <button
                    className="btn btn-sm"
                    onClick={() => setShowAlert(false)}
                  >
                    Deny
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => deleteBlog(blog.id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
              <div className="divider divider-primary h-1"></div>
            </>
          ) : (
            <>
              <div className="self-end ">
                <button
                  className="btn btn-primary btn-xs"
                  onClick={() => setShowAlert(true)}
                >
                  <X />
                </button>
              </div>
              <div className="divider divider-primary h-1"></div>
            </>
          ))}
        <div className="flex justify-between mt-1">
          <Link to={`/blogs/${blog.id}`}>
            <h4 className="card-title text-2xl size-f hover:text-secondary">
              {blog.title}
            </h4>
          </Link>
          <span className="flex items-center gap-2 text-2xl">
            <Calendar />
            {blog.year}
          </span>
        </div>
        <div className="flex gap-2 text-primary">
          <User />
          <span>{blog.author || "Unknown"}</span>
        </div>
      </div>
      <div className="flex justify-between px-5 mt-3">
        <div>
          <div className="flex text-sm ">
            Created at{" "}
            {new Date(blog.createdAt).toLocaleString("it-IT", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            by {blog.user.name || "unknown"}
          </div>
        </div>
        <div className="card-actions justify-center">
          <div className="flex text-sm ">
            <button
              className="btn btn-sm btn-soft btn-secondary"
              onClick={() => updateBlog(blog.id, blog.likes)}
            >
              <Heart size={20} />
              <span>{blog.likes}</span>
            </button>
          </div>

          <div className="flex text-sm ">
            <div className="btn btn-sm btn-soft btn-secondary">
              <ExternalLink size={20} />
              <a
                href={`http://${blog.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Fonte
              </a>
            </div>
          </div>
          <BookmarkButton blogId={blog.id} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
