import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "text-cyan-400"
      : "text-white hover:text-cyan-400";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <Link
          to="/"
          className="text-3xl font-extrabold text-cyan-400"
        >
          AI Travel
        </Link>

        <div className="flex items-center gap-8 text-lg">

          <Link to="/" className={active("/")}>
            Home
          </Link>

          <Link
            to="/destinations"
            className={active("/destinations")}
          >
            Destinations
          </Link>

          <Link
            to="/recommendations"
            className={active("/recommendations")}
          >
            Recommendations
          </Link>

          <Link
            to="/favorites"
            className={active("/favorites")}
          >
            Favorites
          </Link>

          <Link
            to="/trip-planner"
            className={active("/trip-planner")}
          >
            AI Planner
          </Link>

          <Link
            to="/login"
            className="bg-cyan-500 px-5 py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;