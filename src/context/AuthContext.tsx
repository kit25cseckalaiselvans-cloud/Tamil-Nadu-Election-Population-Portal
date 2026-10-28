import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, VerificationItem } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  latestVerification: VerificationItem | null;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isCitizen: boolean;
  isOfficer: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('tn_portal_jwt'));
  const [latestVerification, setLatestVerification] = useState<VerificationItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    try {
      const savedToken = localStorage.getItem('tn_portal_jwt');
      if (!savedToken) {
        setUser(null);
        setLatestVerification(null);
        setLoading(false);
        return;
      }

      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setLatestVerification(data.latestVerification);
      } else {
        localStorage.removeItem('tn_portal_jwt');
        setUser(null);
        setLatestVerification(null);
      }
    } catch (err) {
      console.warn('Could not verify session with server:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('tn_portal_jwt', data.token);
      await refreshUser();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Network error connecting to server.' };
    }
  };

  const register = async (userData: any) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('tn_portal_jwt', data.token);
      await refreshUser();
      return { success: true, user: data.user };
    } catch (err: any) {
      return { success: false, error: 'Network error during registration.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // Ignore network errors on logout
    }
    localStorage.removeItem('tn_portal_jwt');
    setUser(null);
    setToken(null);
    setLatestVerification(null);
  };

  const isCitizen = user?.role === 'Citizen';
  const isOfficer = user?.role === 'Officer';
  const isAdmin = user?.role === 'Administrator';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        latestVerification,
        login,
        register,
        logout,
        refreshUser,
        isCitizen,
        isOfficer,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
