import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { authService } from "../services/authService";
import { removeToken } from "../utils/storage";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const userData = await authService.fetchCurrentUser();
        setUser(userData || null);
      } catch (error) {
        console.error("Error fetching user:", error);
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
