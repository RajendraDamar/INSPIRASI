import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

// Align with mobile: name is optional
type User = { id: string; name?: string } | null;

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

  // on mount, try to rehydrate user from server (httpOnly cookie)
  React.useEffect(() => {
    let mounted = true
    fetch('/api/auth/me')
      .then(r => r.json())
        .then(data => {
          if (!mounted) return
          if (data?.ok && data?.user) {
            const user = data.user as Record<string, unknown>
            const id = (user.sub as string) ?? (user.id as string) ?? null
            if (!id) return
            setUser({ id, name: (user.name as string) ?? undefined })
          }
        })
      .catch(() => {
        // ignore
      })

    return () => {
      mounted = false
    }
  }, [])

  const login = async (name: string) => {
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await resp.json()
      if (data?.ok) {
        // prefer an explicit id from the server response
        const id = (data.user?.id as string) ?? (data.user?.sub as string) ?? (data.id as string) ?? null
        if (!id) throw new Error('login response missing id')
        setUser({ id, name: (data.user?.name as string) ?? name ?? undefined })
        router.push('/reports')
      } else {
        throw new Error(data?.error || 'login failed')
      }
    } catch (err) {
      // suppress noisy errors in UI; real app would surface this to the user
    }
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
