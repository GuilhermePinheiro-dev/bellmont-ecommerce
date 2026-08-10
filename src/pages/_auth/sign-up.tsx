import { createFileRoute, Link } from "@tanstack/react-router";
import { RegisterForm } from "../../components/RegisterForm";
import { Logo } from "../../components/Logo";
import { Separator } from "../../components/Separator";
import IconeGoogle from "@/assets/img/google-icon.png";
import { GoogleAuthButton } from "../../components/GoogleAuthButton";

export const Route = createFileRoute("/_auth/sign-up")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Cadastro - Bellmont" }],
  })
});

function RouteComponent() {
  return (
    <section className="min-h-screen w-full flex justify-center items-center bg-border-light p-5">
      <div className="w-112.5 rounded-2xl bg-white flex flex-col p-5">
        <Logo />
        <RegisterForm />
        <Separator />

        <GoogleAuthButton />

        <p className="text-sm text-gray-600 text-center mt-6">
          Já tem uma conta?{" "}
          <Link to="/sign-in" className="text-info-light hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
}
