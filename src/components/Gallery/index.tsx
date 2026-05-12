import galeriaCard from "@/assets/img/galeria-card.png";
import galeriaRoupas from "@/assets/img/galeria-roupas.png";
import galeriaModelo from "@/assets/img/galeria-modelo.png";
import galeriaPerfume from "@/assets/img/galeria-perfume.png";
import galeriaJoias from "@/assets/img/galeria-joias.png";
import galeriaAcessorios from "@/assets/img/galeria-acessorios.png";
import { Overlay } from "../Overlay";
import { Button } from "../Button";

export const Gallery = () => {
  return (
    <section className="container">
      <div className="grid-gallery">
        <div className="area-highlight overflow-hidden rounded-3xl relative">
          <img
            src={galeriaCard}
            alt="Modelo masculino"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <Overlay title="Aureon one" subtitle="Luxo em cada detalhe" className="inset-0 justify-center text-center text-white">
            <Button variant="secundary" className="text-white">Masculino</Button>
            <Button variant="secundary" className="text-white">Feminno</Button>
          </Overlay>
        </div>
        
        <div className="area-joias overflow-hidden rounded-3xl">
          <img
            src={galeriaJoias}
            alt="Joias douradas"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="area-model overflow-hidden rounded-3xl">
          <img
            src={galeriaModelo}
            alt="Modelo feminina"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="area-perfume overflow-hidden rounded-3xl">
          <img
            src={galeriaPerfume}
            alt="Perfume"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="area-acessorios overflow-hidden rounded-3xl">
          <img
            src={galeriaAcessorios}
            alt="Acessórios"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="area-roupas overflow-hidden rounded-3xl">
          <img
            src={galeriaRoupas}
            alt="Roupas"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};
