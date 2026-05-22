import { useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { LuX } from "react-icons/lu";

import BellmontNoirEssence from "@/assets/img/product-perfume-1.png";
import BellmontGoldenElixir from "@/assets/img/product-perfume-2.png";
import BellmontImperialOud from "@/assets/img/product-perfume-3.png";
import BellmontChronos from "@/assets/img/product-relogio-1.png";
import BellmontHeritageGold from "@/assets/img/product-relogio-2.png";
import { formatCurrency } from "../../utils/format-currency";

const productsInCart = [
  {
    id: 1,
    name: "Produto 1",
    image: BellmontNoirEssence,
    price: 35,
    quantity: 5,
  },
  {
    id: 2,
    name: "Produto 2",
    image: BellmontGoldenElixir,
    price: 75,
    quantity: 2,
  },
  {
    id: 3,
    name: "Produto 3",
    image: BellmontImperialOud,
    price: 85,
    quantity: 4,
  },
  {
    id: 4,
    name: "Produto 4",
    image: BellmontChronos,
    price: 135,
    quantity: 6,
  },
  {
    id: 5,
    name: "Produto 5",
    image: BellmontHeritageGold,
    price: 15,
    quantity: 2,
  },
];

export const ShoppingCart = () => {
  const [valueDrawer, setValueDrawer] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir carrinho"
        className="align-top text-[20px] hover:text-primary-light transition-colors ease-in-out cursor-pointer"
        onClick={() => setValueDrawer(!valueDrawer)}
      >
        <IoBagOutline />
      </button>

      <div
        className={`${valueDrawer ? " bg-black/70 visible" : "bg-transparent invisible"} fixed bottom-0 left-0 top-0 right-0 duration-300`}
        onClick={() => setValueDrawer(!valueDrawer)}
      >
        <div
          className={`${valueDrawer ? "translate-x-0" : "translate-x-full"} h-full absolute right-0 top-0 bottom-0 pt-6 bg-background transition-all ease-in-out duration-600 w-75 md:w-106`}
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex justify-between font-semibold items-center px-5">
            <p>Carrinho ({productsInCart.length})</p>

            <button
              className="cursor-pointer text-3xl"
              onClick={() => setValueDrawer(!valueDrawer)}
            >
              <LuX />
            </button>
          </header>

            <ul className="overflow-y-auto scrollbar-hide h-[calc(100%-140px)] py-4 flex flex-col gap-3">
              {productsInCart.map((product) => (
                <li key={product.id} className="flex flex-col gap-1 px-10">
                  <button className="self-end cursor-pointer">
                    <LuX />
                  </button>
                  <div className="flex gap-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />

                    <div className="flex flex-col items-start gap-1">
                      <p className="text-sm">{product.name}</p>
                      <p className="text-sm">Quantidade:{product.quantity}</p>
                      <p className="font-semibold text-[17px]">
                        {formatCurrency(product.price)} à vista
                      </p>

                      <div className="flex gap-5 border py-1 px-4 items-center">
                        <button className="cursor-pointer">-</button>
                        <p className="text-[16px]">{product.quantity}</p>
                        <button className="cursor-pointer">+</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="absolute bottom-0 w-full h-25 p-4 ">
              <button className="h-full w-full bg-primary-dark hover:bg-primary text-white cursor-pointer rounded-xs">
                Fechar Pedido
              </button>
            </footer>
        </div>
      </div>
    </>
  );
};
