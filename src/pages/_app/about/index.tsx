import { createFileRoute, Link } from "@tanstack/react-router";
import galeriaCard from "@/assets/img/galeria-card.png";


export const Route = createFileRoute("/_app/about/")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Sobre - Bellmont" }],
  })
});

function RouteComponent() {
  return (
    <section className="flex flex-col md:flex-row items-center md:h-screen">
      <div className="md:w-1/2 h-full">
        <img src={galeriaCard} alt="Homem sentado" className="size-full object-cover"/>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center h-full text-text px-8 py-16 lg:px-20">
        <h2 className="text-5xl lg:text-6xl font-medium text-primary-dark mb-2">Sobre nós</h2>

        <p className="text-lg leading-relaxed mb-5">
          Somos apaixonados por calçados que unem estilo, conforto e
          durabilidade. Nossa missão? Fazer você se sentir bem a cada passo,
          oferecendo uma experiencia de compra incrivel e uma seleção de tênis,
          botas e sapatos para todas as ocasiões.
        </p>

        <Link to="/our-stores"
        className="self-start inline-block text-xs font-bold uppercase border-b-2 tracking-[2.5px] hover:text-gold-soft trnasition-colors duration-500"
        >Saiba mais sobre nossas lojas</Link>
      </div>
    </section>
  );
}
