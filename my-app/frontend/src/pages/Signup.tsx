import { useState } from "react";
import usersService from "../services/users.ts";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      const user = await usersService.create({ username, password, name });

      if (user) {
        setError(null);
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("azios");

        return setError(error.response?.data.error);
      }
      if (error instanceof Error) {
        return setError(error.message);
      }
      console.log(error);

      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-5 mx-auto">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset ">
          <label className="label">Username</label>
          <input
            type="email"
            name="username"
            className="input"
            placeholder="Username"
            required
          />

          <label className="label">Name</label>
          <input
            required
            type="text"
            name="name"
            className="input"
            placeholder="Name"
          />

          <label className="label">Password</label>
          <input
            required
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />

          {error !== null && (
            <p className="text-center text-error p-2">{error}</p>
          )}
          <button
            type="submit"
            className="btn btn-neutral mt-4"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              <span>Signup</span>
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
