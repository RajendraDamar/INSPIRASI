import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: string; name?: string } | null;

type AuthContext = {
  user: User;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rehydrate from server
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!mounted) return;
        if (res.ok) {
          const json = await res.json();
          setUser(json?.user ?? null);
        }
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (token: string) => {
    // Call server to exchange token (or set cookie) - placeholder
    try {
      const resp = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ token }), headers: { 'Content-Type': 'application/json' } });
      if (!resp.ok) {
        throw new Error(`login failed: ${resp.status}`);
      }
      const body = await resp.json().catch(() => null);
      // Prefer using user info from login response if available
      const maybeUser = body?.user ?? body ?? null;
      if (maybeUser && (maybeUser.id || maybeUser.sub)) {
        const id = maybeUser.id ?? maybeUser.sub;
        setUser({ id, name: maybeUser.name ?? undefined });
        return;
      }

      // Fallback to rehydrate endpoint
      const re = await fetch('/api/auth/me');
      if (!re.ok) {
        // rollback any partial state
        setUser(null);
        throw new Error('login succeeded but rehydrate failed');
      }
      const j = await re.json();
      setUser(j?.user ?? null);
    } catch (err) {
      // ensure we don't leave a partial auth state
      setUser(null);
      throw err;
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
