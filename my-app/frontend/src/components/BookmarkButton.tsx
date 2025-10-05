import { useAuthContext } from "../contexts/AuthContext.tsx";
import { useReadingsContext } from "../contexts/ReadingsContext.tsx";
import { BookmarkMinus, BookmarkPlus } from "lucide-react";

const BookmarkButton = ({ blogId }: { blogId: string }) => {
  const { user } = useAuthContext();
  const { isInReadings, removeFromReadings, addToReadings } =
    useReadingsContext();

  if (!user) return null;

  return (
    <div className="flex text-sm ">
      {isInReadings(blogId) ? (
        <button
          className="btn btn-sm btn-soft btn-secondary"
          onClick={() => removeFromReadings(blogId)}
        >
          <BookmarkMinus size={20} />
        </button>
      ) : (
        <button
          className="btn btn-sm btn-soft btn-secondary"
          onClick={() => addToReadings(blogId)}
        >
          <BookmarkPlus size={20} />
        </button>
      )}
    </div>
  );
};

export default BookmarkButton;
