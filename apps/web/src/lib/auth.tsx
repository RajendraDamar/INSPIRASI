import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

type User = { id: string; name: string } | null;

type AuthContext = {
  user: User;
  login: (name: string) => void;
  logout: () => void;
  requireAuth: (cb?: () => void) => void;
};

const Ctx = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  const login = (name: string) => {
    setUser({ id: '1', name });
    router.push('/reports');
  };

  const logout = () => {
    // Call server to clear httpOnly cookie, then clear client state and redirect to login
    fetch('/api/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      .catch(() => {
        // ignore network failures but still clear client state
      })
      .finally(() => {
        setUser(null);
        router.push('/auth/login');
      })
  };

  const requireAuth = (cb?: () => void) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    cb?.();
  };

  return (
    <Ctx.Provider value={{ user, login, logout, requireAuth }}>{children}</Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
