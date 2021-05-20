import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { authenticate as authenticateRequest } from '../services/authentication';

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

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
