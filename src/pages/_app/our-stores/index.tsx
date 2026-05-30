import { createFileRoute } from "@tanstack/react-router";
import BannerStore from "@/assets/img/banner-nossas-lojas.png";
import OurStores1 from "@/assets/img/loja-1.png";
import OurStores2 from "@/assets/img/loja-2.png";

export const Route = createFileRoute("/_app/our-stores/")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Nossas Lojas - Bellmont" }],
  })
});

function RouteComponent() {
  return (
    <section className="container py-6">
      <img
        src={BannerStore}
        alt="banner do interior de uma das Loja da Bellmont "
        className="rounded-[20px] h-80 md:h-125 object-cover w-full"
      />
      <div>
        <h1 className="text-text text-2xl max-w-7xl text-center m-auto my-20">
          Nossas lojas são o coração da nossa marca. <br/>Explore a coleção mais
          recente, experimente seus modelos favoritos e sinta o conforto da
          SyntaxWear pessoalmente
        </h1>

        <section className="w-full text-text space-y-10">
          <div className="flex flex-col md:flex-row items-center gap-2.5">
            <div className="text-center py-6">
              <h2 className="text-3xl mb-5">Novidades ao vivo</h2>

              <p>
                Descubra os lançamentos da temporada antes de todo mundo e
                experimente nossos estilos mais recentes de perto.
              </p>
            </div>

            <img
              src={OurStores1}
              alt="Relógio da marca Bellmont"
              className="rounded-[20px] md:max-w-[42vw] aspect-10/7 object-cover size-full"
            />
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center gap-2.5">
            <img
              src={OurStores2}
              alt="Dois modelos conversando dentro da loja Bellmont"
              className="rounded-[20px] md:max-w-[42vw] aspect-10/7 object-cover size-full"
            />

            <div className="text-center py-6">
              <h2 className="text-3xl mb-5">Atendimento sob medida</h2>

              <p>
                Conte com dicas de estilo, sugestões exclusivas e suporte
                personalizado de quem realmente entende de moda.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
