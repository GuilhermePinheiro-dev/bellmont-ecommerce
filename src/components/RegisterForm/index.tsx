import { useRegisterForm } from "./register-form.schema";

export const RegisterForm = () => {
  const { register, errors, isSubmitting } = useRegisterForm();

  return (
    <form className="space-y-4 mt-2">
      <div className="flex flex-col text-text-muted">
        <label>Nome*</label>
        <input
          type="text"
          {...register("firstName")}
          className={`w-full border rounded-sm p-1.5 mt-1 focus:outline-none ${errors.firstName ? "border-danger focus:ring-2 focus:ring-danger-light" : "border-success"}`}
        />
        {errors.firstName && <p className="text-danger text-sm">{errors.firstName.message}</p>}
      </div>

      <div className="flex flex-col text-text-muted">
        <label>Sobrenome*</label>
        <input
          type="text"
          {...register("lastName")}
          className={`w-full border rounded-sm p-1.5 mt-1 focus:outline-none ${errors.lastName ? "border-danger focus:ring-2 focus:ring-danger-light" : "border-success"}`}
        />
        {errors.lastName && <p className="text-danger text-sm">{errors.lastName.message}</p>}
      </div>

      <div className="flex flex-col text-text-muted">
        <label>E-mail*</label>
        <input
          type="email"
          placeholder="email@email.com"
          {...register("email")}
          className={`w-full border rounded-sm p-1.5 mt-1 focus:outline-none ${errors.email ? "border-danger focus:ring-2 focus:ring-danger-light" : "border-success"}`}
        />
        {errors.email && <p className="text-danger text-sm">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col text-text-muted">
        <label>CPF*</label>
        <input
          type="text"
          placeholder="000.000.000-00"
          {...register("cpf")}
          className={`w-full border rounded-sm p-1.5 mt-1 focus:outline-none ${errors.cpf ? "border-danger focus:ring-2 focus:ring-danger-light" : "border-success"}`}
        />
        {errors.cpf && <p className="text-danger text-sm">{errors.cpf.message}</p>}
      </div>

      <div className="flex flex-col text-text-muted">
        <label>Data de Nascimento</label>
        <input
          type="date"
          {...register("birthDate")}
          className={`w-full border rounded-sm p-1.5 mt-1 focus:outline-none ${errors.birthDate ? "border-danger focus:ring-2 focus:ring-danger-light" : "border-success"}`}
        />
        {errors.birthDate && <p className="text-danger text-sm">{errors.birthDate.message}</p>}
      </div>

      <div className="flex flex-col text-text-muted">
        <label>Telefone*</label>
        <input
          type="tel"
          placeholder="(00) 00000-0000"
          {...register("phone")}
          className={`w-full border rounded-sm p-1.5 mt-1 focus:outline-none ${errors.phone ? "border-danger focus:ring-2 focus:ring-danger-light" : "border-success"}`}
        />
        {errors.phone && <p className="text-danger text-sm">{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col text-text-muted">
        <label>Senha*</label>
        <input
          type="password"
          {...register("password")}
          className={`w-full border rounded-sm p-1.5 mt-1 focus:outline-none ${errors.password ? "border-danger focus:ring-2 focus:ring-danger-light" : "border-success"}`}
        />
        {errors.password && <p className="text-danger text-sm">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col text-text-muted">
        <label>Confirmar Senha*</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className={`w-full border rounded-sm p-1.5 mt-1 focus:outline-none ${errors.confirmPassword ? "border-danger focus:ring-2 focus:ring-danger-light" : "border-success"}`}
        />
        {errors.confirmPassword && (
          <p className="text-danger text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button disabled={isSubmitting} className="bg-primary-dark text-white uppercase font-semibold rounded-md py-3 transition-all hover:bg-primary-light disabled:opacity-50 w-full cursor-pointer">
        {isSubmitting ? "Enviando..." : "Continuar"}
      </button>
    </form>
  );
};
