import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../api/client";
import { setToken } from "../utils/storage";
import LoginDesign from "../components/LoginDesign";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await api.login(email, password);
      setToken(data.token);
      navigate("/feed");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <LoginDesign
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
      registerLink={<Link to="/register" className="font-medium text-indigo-300 transition hover:text-indigo-200">Create account</Link>}
    />
  );
}