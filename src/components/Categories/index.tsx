import { categories } from "../../mocks/categorys";
import { Button } from "../Button";
import { useRouter } from "@tanstack/react-router";


export const Categories = () => {
  const router = useRouter();

  return (
    <section className="container flex lg:grid lg:grid-cols-4 my-5 gap-4 overflow-x-auto  scrollbar-hide snap-x snap-mandatory">
      {categories.map((category, i) => (
        <div
          key={i}
          style={{ backgroundImage: `url(${category.image})` }}
          className="relative h-125 bg-cover bg-center rounded-[20px] overflow-hidden flex justify-center items-center shrink-0 w-[95%] md:w-1/2 lg:w-full snap-center"
        >
          <div className="absolute inset-0 bg-overlay "></div>

          <div className="relative">
            <Button
              className="text-white"
              variant="secundary"
              onClick={() =>
                router.navigate({
                  to: `/products/categorys/$category`, params: { category: category.name.toLowerCase()}
                })
              }
            >
              {category.name}
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
};
