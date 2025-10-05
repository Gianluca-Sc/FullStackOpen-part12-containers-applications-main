import type { Author as AuthorInterface } from "../types.ts";

const Author = ({ author, article, likes }: AuthorInterface) => {
  return (
    <div className="flex shadow">
      <div className="stat flex items-center w-3/5">
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-16 rounded-full">
            <span className="text-3xl">{(author || "unknown").charAt(0)}</span>
          </div>
        </div>

        <div className="text-2xl">{author || "unknown"}</div>
      </div>

      <div className="stat  w-1/5">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Articles</div>
        <div className="stat-value text-secondary">{article}</div>
      </div>
      <div className="stat  w-1/5">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Likes</div>
        <div className="stat-value text-primary">{likes}</div>
      </div>
    </div>
  );
};

export default Author;
