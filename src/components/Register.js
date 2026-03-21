import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleRegister() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ email, password });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered Successfully");
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-3">Register</h3>

        <input className="form-control mb-3" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input type="password" className="form-control mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-success w-100" onClick={handleRegister}>
          Register
        </button>

        <p className="mt-3 text-center">
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}