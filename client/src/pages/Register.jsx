import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as client from "../api/client"

export default function Register () {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

const handleRegister = async () => {
  try {
    await client.register(name, email, password)
    alert("Registration successful! Please log in.")
    navigate("/")
  } catch (error) {
    alert("Registration failed: " + error.message)
  } 
}


  return (
    <div>
      <h1>Sign up</h1>
      <input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Sign up</button>

    </div>
  )
}