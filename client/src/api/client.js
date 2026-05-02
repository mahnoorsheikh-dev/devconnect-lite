const BASE_URL = "http://localhost:5000/api"

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })      
    if (!response.ok) {
      throw new Error("Login failed")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error during login:", error)
    throw error
  } 
}

export const register = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    })
    if (!response.ok) {
      throw new Error("Registration failed")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error during registration:", error)
    throw error
  }
}