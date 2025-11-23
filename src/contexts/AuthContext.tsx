
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  savedEventIds?: number[];
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  saveEvent: (eventId: number) => Promise<void>;
  removeSavedEvent: (eventId: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAuthenticated = currentUser !== null;

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(async (r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => {});
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      setCurrentUser(data.user);
      toast({ title: "Registration Successful", description: `Welcome ${data.user.name}!` });
      return true;
    }
    const { message } = await res.json().catch(() => ({ message: "Registration failed" }));
    toast({ title: "Registration Error", description: message, variant: "destructive" });
    return false;
  };

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      setCurrentUser(data.user);
      toast({ title: "Login Successful", description: `Welcome back ${data.user.name}!` });
      return true;
    }
    const { message } = await res.json().catch(() => ({ message: "Login failed" }));
    toast({ title: "Login Failed", description: message, variant: "destructive" });
    return false;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => {});
    setCurrentUser(null);
    toast({ title: "Logged Out", description: "You have been logged out successfully." });
    navigate("/login");
  };

  const saveEvent = async (eventId: number) => {
    await fetch(`/api/user/saved/${eventId}`, { method: "POST", credentials: "include" });
    setCurrentUser((u) => (u ? { ...u, savedEventIds: [...new Set([...(u.savedEventIds || []), eventId])] } : u));
  };

  const removeSavedEvent = async (eventId: number) => {
    await fetch(`/api/user/saved/${eventId}`, { method: "DELETE", credentials: "include" });
    setCurrentUser((u) => (u ? { ...u, savedEventIds: (u.savedEventIds || []).filter((id) => id !== eventId) } : u));
  };

  const value = { currentUser, isAuthenticated, register, login, logout, saveEvent, removeSavedEvent };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
