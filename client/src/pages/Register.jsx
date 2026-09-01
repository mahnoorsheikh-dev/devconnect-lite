import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../api/client";
import SignupDesign from "../components/SignupDesign";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.register(name, email, password);
      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <SignupDesign
      name={name}
      email={email}
      password={password}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      handleRegister={handleRegister}
      loginLink={<Link to="/" className="font-medium text-indigo-300 transition hover:text-indigo-200">Sign in</Link>}
    />
  );
}