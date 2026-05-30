import { createFileRoute, Link } from "@tanstack/react-router";
import { LoginForm } from "../../components/LoginForm";
import { Logo } from "../../components/Logo";
import { Separator } from "../../components/Separator";
import IconeGoogle from "@/assets/img/google-icon.png";

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Login - Bellmont" }],
  })
});

function RouteComponent() {
  return (
    <section className="min-h-screen w-full flex justify-center items-center bg-border-light p-5">
      <div className="w-112.5 rounded-2xl bg-white flex flex-col p-5 space-y-2.5">
        <Logo />
        <h2 className="text-xl font-bold text-black">Entrar</h2>
        <p className="text-sm font-medium text-black">
          Escolha como deseja fazer login
        </p>
        <button className="w-full flex  items-center justify-center gap-2 border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition cursor-pointer">
          <img src={IconeGoogle} alt="Icone do Google" className="w-5 h-5" />
          <span className="text-sm font-medium text-black">
            Continuar com o google
          </span>
        </button>
        <Separator />
        <LoginForm />

        <p className="text-sm text-gray-600 text-center mt-6">
          Não possui uma conta?{" "}
          <Link to="/sign-up" className="text-info-light hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </section>
  );
}
