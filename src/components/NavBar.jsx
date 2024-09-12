import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const links = [
    { path: "/", title: "Home" },
    { path: "/login", title: "Login" },
    { path: "/sign-up", title: "SignUP" },
    { path: "/show-users", title: "Show Users" },
  ];

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <div className="navbar bg-zinc-800 px-20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links.map((eachLink) => (
                <li key={eachLink.path}>
                  <NavLink
                    to={eachLink.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-xl text-orange-600"
                        : "text-xl text-white"
                    }
                  >
                    {eachLink.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/">
            <h3 className="btn btn-ghost text-xl text-white">
              Itransition Task
            </h3>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-x-3">
            {links.map((eachLink) => (
              <li key={eachLink.path}>
                <NavLink
                  to={eachLink.path}
                  className={({ isActive }) =>
                    isActive ? "text-orange-600 text-xl" : "text-white text-xl"
                  }
                >
                  {eachLink.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <Link to="/login">
              <button onClick={handleLogOut} className="btn btn-secondary">
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn btn-secondary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
