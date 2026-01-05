import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getAuth, getHealth, logoutGoogle, BASE_URL } from '../services/api';

type AuthContextType = {
    isAuthenticated: boolean;
    userEmail: string;
    serverStatus: boolean;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [serverStatus, setServerStatus] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        checkServerStatus();
        checkAuth();
    }, [BASE_URL]);

    const checkServerStatus = async () => {
        try {
            const response = await getHealth();

        if (response.ok) {
            const data = await response.json()
            setServerStatus(data.status === 'ok')
        } else {
            setServerStatus(false)
        }
      } catch (error) {
            console.log('Server not available: ', error)
            setServerStatus(false)
      }
    }
  
    const checkAuth = async () => {
        try {
            const response = await getAuth();

        if (response.ok) {
            const data = await response.json()
            setIsAuthenticated(data.authenticated)
            setUserEmail(data.userEmail)
        } else {
            setIsAuthenticated(false)
            setUserEmail('')
        }
        } catch (error) {
            console.log('Server not authenticated: ', error)
            setIsAuthenticated(false)
            setUserEmail('')
        }
    }

    const logout = async () => {
        try {
            await logoutGoogle();
        } catch (error) {
            console.log('Logout request failed: ', error)
        }

        setIsAuthenticated(false)
        setUserEmail('')
    }

    return <AuthContext.Provider value={{ isAuthenticated, userEmail, serverStatus, checkAuth, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
