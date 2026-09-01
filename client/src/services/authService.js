import { login, register, getUser } from '../api/client';
import { getToken, setToken, removeToken } from '../utils/storage';

export const authService = {
  async login(email, password) {
    const data = await login(email, password);
    if (data?.token) {
      setToken(data.token);
    }
    return data;
  },

  async register(payload) {
    const data = await register(payload.name, payload.email, payload.password);
    if (data?.token) {
      setToken(data.token);
    }
    return data;
  },

  async logout() {
    removeToken();
  },

  async fetchCurrentUser() {
    const token = getToken();
    if (!token) return null;
    return getUser(token);
  },
};
