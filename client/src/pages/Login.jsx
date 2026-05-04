import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as client from "../api/client"


export default function Login () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  const handleLogin = async () => {
    try {
      const data = await client.login(email, password)
      localStorage.setItem("token", data.token)
      navigate("/feed")
    } catch (error) {
      alert("Login failed: " + error.message)
    }
  }


  return (
    <div>   
      <h1>Login</h1>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

