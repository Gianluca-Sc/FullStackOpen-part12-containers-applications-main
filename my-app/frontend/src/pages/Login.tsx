import { useState } from "react";
import authService from "../services/auth.ts";

import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext.tsx";
import { AxiosError } from "axios";

const Login = () => {
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const user = await authService.login({ username, password });
      if (user) {
        loginUser(user);
        setError(null);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
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

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            required
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
              <span>Login</span>
            )}
          </button>
        </fieldset>
      </form>

      <div className="fieldset">
        <div className="divider divider-neutral">OR</div>
        <Link to="/signup" className=" btn btn-secondary ">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
