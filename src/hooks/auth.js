import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import {
  authenticate as authenticateRequest,
  register as registerRequest,
} from '../services/authentication';
import { getUserData } from '../services/user';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const { data } = await authenticateRequest({ email, password });

      if (data) {
        localStorage.setItem('token', data.access_token);

        setUser(data.user);

        router.push('/characters');
      }
    } catch (error) {
      toast.warn(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser({});
    router.push('/login');
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      await registerRequest(userData);

      toast.success('Account created, you can login');
      router.push('/login');
    } catch (error) {
      toast.warn(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifySession = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const { data } = await getUserData();
        setUser(data.user);
        router.push('/characters');
      } else {
        router.push('/login');
      }
    } catch (error) {
      toast.warn('Please, confirm your credential again');
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate,
        isLoading,
        logout,
        verifySession,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
