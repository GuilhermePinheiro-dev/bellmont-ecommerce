import banner from "@/assets/img/banner.png";
import { Button } from "../Button";
import { Overlay } from "../Overlay";

export const Hero = () => {
  return (
    <div className="container">
      <section className="h-125 relative">
        <img
          src={banner}
          alt="Banner da Bellmont"
          className="h-full w-full rounded-3xl object-cover"
        />

        <Overlay title="Aureon one" subtitle="Luxo em cada detalhe" className="bottom-0 justify-start text-center px-6 md:px-24 lg:px-40 pb-35">
          <Button>Comprar</Button>
          <Button
            className="text-white sm:text-text"
            variant="secundary"
            size="sm"
          >
            Ver produtos
          </Button>
        </Overlay>
      </section>
    </div>
  );
};
