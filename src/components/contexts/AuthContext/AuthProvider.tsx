import { useEffect, useState } from "react";
import {
  AuthContext,
  type Credentials,
  type RegisterInput,
  type User,
} from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
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
        setUser(data.user);
        setIsAuthenticated(true);

        console.log(data.user);
      } catch (error) {
        console.error("Erro ao buscar perfil so usuário", error);
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchUserProfile();
  }, []);

  async function signIn(credentials: Credentials): Promise<void> {
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

    setUser(data.user);
    setIsAuthenticated(true);
  }

  async function signUp(data: RegisterInput): Promise<void> {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(data),
    });

    const result = await response.json()

    if(!response.ok){
      throw new Error(result.message || "Erro ao cadastra usuário")
    }
    setUser(result.user)
    setIsAuthenticated(true)
  }

  async function signOut(): Promise<void> {
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

    let user = result.user;

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

      const profile = (await profileResponse.json()) as { user?: User };
      user = profile.user;
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
