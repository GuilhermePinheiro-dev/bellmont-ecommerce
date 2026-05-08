import banner from "../../assets/img/banner.png";

export const Hero = () => {
  return (
    <div className="container">
      <section className="h-125 relative">
        <img
          src={banner}
          alt="Banner da Bellmont"
          className="h-full w-full rounded-3xl object-cover"
        />

        <div className="absolute w-full bottom-0 flex justify-start items-center text-center px-6 md:px-24 pb-40 font-title">
            <div>
                <h2 className="text-xl mb-2">Aureon one</h2>
                <h1 className="text-4xl mb-8">Luxo em cada detalhe.</h1>

                <div>
                    <button>Ver produtos</button>
                    <button>Comprar</button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};
