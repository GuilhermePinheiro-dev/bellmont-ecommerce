import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export const LoginForm = () => {
  const { signIn } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signInFormSchema = z.object({
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  });

  type SignInFormData = z.infer<typeof signInFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setAuthError(null);

    try {
      await signIn(data);
      navigate({ to: "/" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao fazer login";
      setAuthError(message);
      console.log("Erro ao fazer login", error);
    }
  };

  return (
    <form className="flex flex-col gap-3.5 " onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="email"
        className="border rounded-md w-full text-black border-gray-200 p-3 focus:outline-none"
        {...register("email")}
      />

      {errors.email && (
        <span className="text-danger text-sm">{errors.email.message}</span>
      )}

      <input
        type="password"
        placeholder="senha"
        className="border rounded-md w-full text-black border-gray-200 p-3 focus:outline-none"
        {...register("password")}
      />

      {errors.password && (
        <span className="text-danger text-sm">{errors.password.message}</span>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary-dark text-white uppercase font-semibold rounded-md py-3 transition-all hover:bg-primary-light disabled:opacity-50 w-full cursor-pointer flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Enviando...
          </>
        ) : (
          "Continuar"
        )}
      </button>

      {authError && (
        <p className="text-danger text-sm text-center">{authError}</p>
      )}
    </form>
  );
};
