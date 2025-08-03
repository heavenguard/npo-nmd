"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/functions/firebase";
import { useRouter } from "next/navigation";
import { getADocument } from "@/functions/get-a-document";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userInfo: any;
  loading: boolean
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    console.log({ email, password });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/member-portal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribeUser = getADocument(user.uid, "users", (data) => {
      setUserInfo(data);
      setLoading(false); // only set loading to false *after* userInfo is set
    });

    return () => {
      if (unsubscribeUser) unsubscribeUser();
    };
  }, [user]);

  // Auth state listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userInfo, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
