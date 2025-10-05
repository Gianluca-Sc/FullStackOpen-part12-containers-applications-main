import { LogOut, UserCircle, UserCog } from "lucide-react";
import { useAuthContext } from "../contexts/AuthContext.tsx";
import NavLink from "./Navlink.tsx";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-base-300 px-10 py-5 mb-10">
      <div className="navbar-start">
        <ul className="flex gap-5 ">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/authors">Authors</NavLink>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className=" dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-primary m-1 text-amber-50"
            >
              <span>{user.name || user.username}</span>
              <UserCircle />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-300 rounded-box  z-1 w-25 p-2 shadow-sm"
            >
              <li>
                <Link to={`/users/${user.userId}`}>
                  Profile
                  <UserCog />
                </Link>
              </li>
              <li>
                <button onClick={logoutUser}>
                  Logout
                  <LogOut />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <ul>
            <button
              onClick={() => navigate("/login")}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Email icon"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="black"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              Login with Email
            </button>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
