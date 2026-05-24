import { useContext, useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { LuX } from "react-icons/lu";
import { CartContext } from "../contexts/CartContext";
import { formatCurrency } from "../../utils/format-currency";

export const ShoppingCart = () => {
  const [valueDrawer, setValueDrawer] = useState<boolean>(false);
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } =
    useContext(CartContext);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir carrinho"
        className="text-[20px] hover:text-primary-light transition-colors ease-in-out cursor-pointer flex items-center"
        onClick={() => setValueDrawer(!valueDrawer)}
      >
        <IoBagOutline />
      </button>

      <div
        className={`${valueDrawer ? " bg-black/70 visible" : "bg-transparent invisible"} fixed bottom-0 left-0 top-0 right-0 duration-300 z-40`}
        onClick={() => setValueDrawer(!valueDrawer)}
      >
        <div
          className={`${valueDrawer ? "translate-x-0" : "translate-x-full"} h-full absolute right-0 top-0 bottom-0 pt-6 bg-background transition-all ease-in-out duration-600 w-75 md:w-106 z-50`}
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex justify-between font-semibold items-center px-5">
            <p>Carrinho ({cart.length})</p>

            <button
              className="cursor-pointer text-3xl"
              onClick={() => setValueDrawer(!valueDrawer)}
            >
              <LuX />
            </button>
          </header>

          <ul className="overflow-y-auto scrollbar-hide h-[calc(100%-140px)] py-4 flex flex-col gap-3">
            {cart.map((product) => (
              <li key={product.id} className="flex flex-col gap-1 px-10">
                <button
                  className="self-end cursor-pointer"
                  onClick={() => removeFromCart(product.id)}
                >
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
                      <button
                        className="cursor-pointer"
                        onClick={() => decrementQuantity(product)}
                      >
                        -
                      </button>
                      <p className="text-[16px]">{product.quantity}</p>
                      <button
                        className="cursor-pointer"
                        onClick={() => incrementQuantity(product)}
                      >
                        +
                      </button>
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
