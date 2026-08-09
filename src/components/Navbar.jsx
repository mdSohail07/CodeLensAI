import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        CodeLens AI
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/workspace">Code Explainer</Link>
        <Link to="/history">History</Link>
      </div>

      <Link
        to="/workspace"
        className="navbar-button"
      >
        Start →
      </Link>

    </nav>
  );
}

export default Navbar;