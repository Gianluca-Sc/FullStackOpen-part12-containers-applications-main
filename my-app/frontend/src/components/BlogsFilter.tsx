interface BlogsFilterProps {
  handlesubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  searchParams: URLSearchParams;
  loading: boolean;
}

const BlogsFilter = ({
  handlesubmit,
  searchParams,
  loading,
}: BlogsFilterProps) => {
  return (
    <form className=" join rounded-2xl " onSubmit={handlesubmit}>
      <div className="size-full ">
        <div className="flex justify-end">
          <input
            className="input join-item "
            name="search"
            placeholder="Search"
            defaultValue={searchParams.get("search") || ""}
          />
        </div>
      </div>

      <div className="indicator">
        <button className="btn btn-primary join-item" disabled={loading}>
          Search
        </button>
      </div>
    </form>
  );
};

export default BlogsFilter;
