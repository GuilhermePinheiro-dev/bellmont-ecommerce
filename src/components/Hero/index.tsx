import banner from "@/assets/img/banner.png";
import { Button } from "../Button";

export const Hero = () => {
  return (
    <div className="container">
      <section className="h-125 relative">
        <img
          src={banner}
          alt="Banner da Bellmont"
          className="h-full w-full rounded-3xl object-cover"
        />

        <div className="absolute w-full bottom-0 flex justify-start items-center text-center px-6 md:px-24 lg:px-40 pb-35 font-title">
            <div>
                <h2 className="text-xl mb-2">Aureon one</h2>
                <h1 className="text-4xl mb-8">Luxo em cada detalhe.</h1>

                <div className="flex gap-4 justify-center">
                    <Button>Comprar</Button>
                    <Button className="text-white sm:text-text" variant="secundary" size="sm">Ver produtos</Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};
