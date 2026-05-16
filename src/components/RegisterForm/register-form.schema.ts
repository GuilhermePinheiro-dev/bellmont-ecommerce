import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isValidCPF } from "../../utils/cpf_validator";

export const registerUserFormSchema = z
  .object({
    email: z.email("E-mail inválido"),

    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),

    confirmPassword: z
      .string()
      .nonempty("A confirmação de senha é obrigatória"),

    cpf: z
      .string()
      .nonempty("O CPF é obrigatório")
      .refine((cpf) => isValidCPF(cpf), {
        message: "CPF inválido",
      }),

    birthDate: z
      .string()
      .nonempty("A data de nascimento é obrigatória")
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Data de nascimento inválida",
      }),

    firstName: z.string().nonempty("O primeiro nome é obrigatório"),

    lastName: z.string().nonempty("O último nome é obrigatório"),

    phone: z.string().nonempty("Telefone é obrigatório"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerUserFormSchema>;

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    criteriaMode: "all",
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setError,
    reset,
  };
};
