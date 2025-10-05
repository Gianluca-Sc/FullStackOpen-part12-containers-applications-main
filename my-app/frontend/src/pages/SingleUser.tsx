import useUser from "../hooks/useUser.ts";

import { Link, useParams } from "react-router";
import {
  BookmarkMinus,
  BookmarkPlus,
  Calendar,
  ExternalLink,
  Heart,
  User,
} from "lucide-react";
import { useReadingsContext } from "../contexts/ReadingsContext.tsx";

const SingleUser = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id || "");
  const { isInReadings, removeFromReadings, addToReadings } =
    useReadingsContext();

  if (loading) {
    return (
      <div className="min-h-96 mx-auto flex flex-col items-center gap-3">
        <div className="skeleton h-45 w-200"></div>
      </div>
    );
  }

  if (error) return <div>{error.message}</div>;

  const handleClick = (id: string) => {
    if (isInReadings(id)) {
      removeFromReadings(id);
    } else {
      addToReadings(id);
    }
  };

  return (
    <main className=" flex flex-col   mx-auto gap-5 p-5">
      <div className="flex shadow">
        <div className=" flex items-center w-3/5 p-5 gap-5 ">
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-16 rounded-full">
              <span className="text-3xl">
                {(user?.name || "unknown").charAt(0)}
              </span>
            </div>
          </div>
          <div className="text-2xl mr-5">{user?.name || "unknown"}</div>

          <div className="text-2xl">{user?.username || "unknown"}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="p-5 bg-base-300 ">My Readings</h3>
        <div className="divider"></div>
        <div className="flex flex-col gap-5">
          {user?.readings.map((reading) => {
            return (
              <div
                key={reading.id}
                className="card min-w-200 shadow-sm px-5 pb-7 bg-base-300"
              >
                <div className="card-body">
                  <div className="flex justify-between mt-1">
                    <Link to={`/blogs/${reading.id}`}>
                      <h4 className="card-title text-2xl size-f hover:text-secondary">
                        {reading.title}
                      </h4>
                    </Link>
                    <span className="flex items-center gap-2 text-2xl">
                      <Calendar />
                      {reading.year}
                    </span>
                  </div>
                  <div className="flex gap-2 text-primary">
                    <User />
                    <span>{reading.author || "Unknown"}</span>
                  </div>
                </div>
                <div className="flex justify-between px-5 mt-3">
                  <div className="card-actions justify-center">
                    <div className="flex text-sm ">
                      <div className="btn btn-sm btn-soft btn-secondary">
                        <Heart size={20} />
                        <span>{reading.likes}</span>
                      </div>
                    </div>
                    {user && (
                      <div className="flex text-sm ">
                        <button
                          className="btn btn-sm btn-soft btn-secondary"
                          onClick={() => handleClick(reading.id)}
                        >
                          {isInReadings(reading.id) ? (
                            <BookmarkMinus size={20} />
                          ) : (
                            <BookmarkPlus size={20} />
                          )}
                        </button>
                      </div>
                    )}
                    <div className="flex text-sm ">
                      <div className="btn btn-sm btn-soft btn-secondary">
                        <ExternalLink size={20} />
                        <a
                          href={`http://${reading.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Fonte
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default SingleUser;
