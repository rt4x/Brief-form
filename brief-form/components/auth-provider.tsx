"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export const ADMIN_EMAIL = "admin@gmail.com";

type AuthContextValue = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAdmin: user?.email === ADMIN_EMAIL,
      loading,
      async signIn(email: string, password: string) {
        if (!auth) {
          throw new Error("Firebase Auth не налаштований.");
        }

        await signInWithEmailAndPassword(auth, email, password);
      },
      async signUp(email: string, password: string) {
        if (!auth) {
          throw new Error("Firebase Auth не налаштований.");
        }

        await createUserWithEmailAndPassword(auth, email, password);
      },
      async signInWithGoogle() {
        if (!auth) {
          throw new Error("Firebase Auth не налаштований.");
        }

        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      },
      async signOutUser() {
        if (!auth) {
          throw new Error("Firebase Auth не налаштований.");
        }

        await signOut(auth);
      },
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth має використовуватися всередині AuthProvider");
  }

  return context;
}

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (!user && !isAuthPage) {
      router.replace("/login");
      return;
    }

    const isBriefsRoute = pathname === "/briefs" || pathname.startsWith("/briefs/");
    if (user && isBriefsRoute && !isAdmin) {
      router.replace("/");
      return;
    }

    if (user && isAuthPage) {
      router.replace("/");
    }
  }, [isAdmin, loading, pathname, router, user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-muted p-6">
        <div className="mx-auto w-full max-w-md rounded-lg border bg-background p-6 text-sm text-muted-foreground">
          Завантаження...
        </div>
      </main>
    );
  }

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isBriefsRoute = pathname === "/briefs" || pathname.startsWith("/briefs/");
  if (!user && !isAuthPage) return null;
  if (user && isAuthPage) return null;
  if (user && isBriefsRoute && !isAdmin) return null;

  return <>{children}</>;
}
