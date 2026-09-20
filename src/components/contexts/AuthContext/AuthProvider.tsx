import { useEffect, useRef, useState } from "react";
import {
  AuthContext,
  type Credentials,
  type RegisterInput,
  type User,
} from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

function getUserFromResponse(data: unknown): User | null {
  if (!data || typeof data !== "object") return null;

  const response = data as { user?: User; id?: number; email?: string };
  return (
    response.user ??
    (typeof response.id === "number" && typeof response.email === "string"
      ? (response as User)
      : null)
  );
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const authRequestId = useRef(0);

  useEffect(() => {
    const requestId = ++authRequestId.current;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/profile", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar perfil do usuário");
        }

        const data = await response.json();
        if (requestId !== authRequestId.current) return;

        const authenticatedUser = getUserFromResponse(data);
        if (!authenticatedUser) {
          throw new Error("O servidor não retornou um usuário válido");
        }

        setUser(authenticatedUser);
        setIsAuthenticated(true);

        console.log(authenticatedUser);
      } catch (error) {
        if (requestId !== authRequestId.current) return;

        console.error("Erro ao buscar perfil so usuário", error);
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchUserProfile();
  }, []);

  async function signIn(credentials: Credentials): Promise<void> {
    ++authRequestId.current;

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Erro ${response.status}`);
    }

    const authenticatedUser = getUserFromResponse(data);
    if (!authenticatedUser) {
      throw new Error("O servidor não retornou um usuário válido");
    }

    setUser(authenticatedUser);
    setIsAuthenticated(true);
  }

  async function signUp(data: RegisterInput): Promise<void> {
    ++authRequestId.current;

    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Erro ao cadastra usuário");
    }
    const authenticatedUser = getUserFromResponse(result);
    if (!authenticatedUser) {
      throw new Error("O servidor não retornou um usuário válido");
    }

    setUser(authenticatedUser);
    setIsAuthenticated(true);
  }

  async function signOut(): Promise<void> {
    ++authRequestId.current;

    try {
      await fetch("http://localhost:3000/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Erro ao fazer logout: ", error);
    }
  }

  async function signInWithGoogle(credential: string): Promise<void> {
    ++authRequestId.current;

    const response = await fetch("http://localhost:3000/auth/google", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential }),
    });

    const responseBody = await response.text();
    let result: { user?: User; message?: string } = {};

    if (responseBody) {
      try {
        result = JSON.parse(responseBody) as { user?: User; message?: string };
      } catch {
        throw new Error(
          "O servidor retornou uma resposta inválida ao autenticar com o Google",
        );
      }
    }

    if (!response.ok) {
      throw new Error(result.message || "Erro ao fazer login com o Google");
    }

    let user = getUserFromResponse(result);

    if (!user) {
      const profileResponse = await fetch(
        "http://localhost:3000/auth/profile",
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!profileResponse.ok) {
        console.log(profileResponse);
        throw new Error(
          "Login concluido, mas não foi possível obter os dados do usuário",
        );
      }

      const profile = await profileResponse.json();
      user = getUserFromResponse(profile);
    }

    if (!user) {
      throw new Error(
        "O servidor não retornou os dados do usuário autenticado",
      );
    }

    setUser(user);
    setIsAuthenticated(true);
  }

  const value = {
    isAuthenticated,
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
