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

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch developers");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching developers:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch developer profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching developer profile:", error);
    throw error;
  }
};

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

// Project API calls
export const getProjects = async () => {
  try {
    const response = await fetch(`${BASE_URL}/projects`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const createProject = async (projectData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (id, projectData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });

    if (!response.ok) {
      throw new Error("Failed to update project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const likeProject = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/projects/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to like project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error liking project:", error);
    throw error;
  }
};

export const getProjectsByUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/projects/user/${userId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user projects");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
};

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