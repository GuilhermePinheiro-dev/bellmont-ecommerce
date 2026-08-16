import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext/AuthContext";

export const GoogleAuthButton = () => {
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [, setLoadingGoogle] = useState<boolean>(false);
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const handleGoogleSucess = async (
    credentialResponse: CredentialResponse,
  ): Promise<void> => {
    const credential = credentialResponse.credential;

    if (!credential) {
      setGoogleError("Credencial do Google inválida. Tente novamente");
      setLoadingGoogle(false);
      return;
    }

    setLoadingGoogle(true);

    try {
      await signInWithGoogle(credential);
      navigate({ to: "/" });
    } catch (error) {
      let errorMessage = "Erro ao fazer login com o Google";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setGoogleError(errorMessage);
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleGoogleError = (): void => {
    setGoogleError("Erro ao autenticar com o google");
    setLoadingGoogle(false);
  };
  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleSucess}
        onError={handleGoogleError}
        size="large"
        text="continue_with"
        shape="rectangular"
        logo_alignment="left"
        width={400}
        containerProps={{ className: "flex w-full justify-center" }}
      />
      {googleError && (
        <p className="mt-3.5 text-red-600 text-center">{googleError}</p>
      )}
    </>
  );
};
