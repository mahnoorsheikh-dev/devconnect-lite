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

export const getPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, { 
      headers: {
          "Content-Type": "application/json",
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

export const getUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })    
    if (!response.ok) {
      throw new Error("Failed to fetch user data")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching user data:", error)
    throw error
  } 
}

export const updateProfile = async (profileData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export const getPostById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })      
    if (!response.ok) {
      throw new Error("Failed to fetch post data")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching post data:", error)
    throw error
  }
}

export const  likePost = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })  
    if (!response.ok) {
      throw new Error("Failed to like post")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error liking post:", error)
    throw error
  }
}

export const commentPost = async (id, content, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    })
    if (!response.ok) {
      throw new Error("Failed to comment on post")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error commenting on post:", error)
    throw error
  }
}

export const updatePost = async (id, content, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    })
    if (!response.ok) {
      throw new Error("Failed to update post")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating post:", error)
    throw error
  }
}

export const deletePost = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error("Failed to delete post")
    }
    return await response.json()
  } catch (error) {
    console.error("Error deleting post:", error)
    throw error
  }
}

export const deleteCommentPost = async (postId, commentId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error("Failed to delete comment")
    }
    return await response.json()
  } catch (error) {
    console.error("Error deleting comment:", error)
    throw error
  }
}

export const updateCommentPost = async (postId, commentId, content, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comment/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    })
    if (!response.ok) {
      throw new Error("Failed to update comment")
    }
    return await response.json()
  } catch (error) {
    console.error("Error updating comment:", error)
    throw error
  }
}