import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">URL Shortener</span>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}