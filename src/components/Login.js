import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", email);
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <input className="form-control mb-3" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input type="password" className="form-control mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="mt-3 text-center">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}