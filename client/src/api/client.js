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

export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
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

export const getPosts = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, { 
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
    })  
    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  } 
}

export const createPost = async (content, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },  
      body: JSON.stringify({ content })
    })
    if (!response.ok) {
      throw new Error("Failed to create post")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating post:", error)
    throw error
  }
}