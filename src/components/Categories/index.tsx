import perfume from "@/assets/img/perfume.png";
import relogio from "@/assets/img/relogio.png";
import joia from "@/assets/img/joia.png";
import roupa from "@/assets/img/roupa.png";
import { Button } from "../Button";

const categories = [
  { name: "Perfumes", image: perfume },
  { name: "Relogios", image: relogio },
  { name: "Joias", image: joia },
  { name: "Roupas", image: roupa },
];

export const Categories = () => {
  return (
    <section className="container flex lg:grid lg:grid-cols-4 my-5 gap-4 overflow-x-auto  scrollbar-hide snap-x snap-mandatory">
      {categories.map((category, i) => (
        <div key={i} 
        style={{backgroundImage: `url(${category.image})`}}
        className="relative h-125 bg-cover bg-center rounded-[20px] overflow-hidden flex justify-center items-center shrink-0 w-[95%] md:w-1/2 lg:w-full snap-center">
          <div className="absolute inset-0 bg-overlay "></div>

          <div className="relative">
            <Button className="text-white" variant="secundary">{category.name}</Button>

          </div>
        </div>
      ))}
    </section>
  );
};
