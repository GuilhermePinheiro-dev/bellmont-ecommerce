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
        className={`${valueDrawer ? "w-full bg-black/70" : "w-0"} fixed bottom-0 left-0 top-0 `}
        onClick={() => setValueDrawer(!valueDrawer)}
      >
        <div
          className={`${valueDrawer ? "w-75 md:w-106" : "w-0"} absolute right-0 top-0 bottom-0 pt-6 bg-white transition-all ease-in-out duration-600`}
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

          <section>
            <ul>
              {productsInCart.map((product) => (
                <li key={product.id} className="flex flex-col gap-1 px-10">
                  <button className="self-end cursor-pointer" >
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
                      <p className="font-semibold text-[17px]">{formatCurrency(product.price)} à vista</p>

                      <div className="flex gap-4 border px-1 px-3">
                        <button className="cursor-pointer">-</button>
                        <p>{product.quantity}</p>
                        <button className="cursor-pointer">+</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};
