import { Link } from "@tanstack/react-router";
import type { Product } from "../../interfaces/product";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../contexts/CartContext";

interface Productprops {
  product: Product;
}

export const ProductCard = ({ product }: Productprops) => {
  const { addinCart } = useContext(CartContext);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const messageTimeoutRef = useRef<number | null>(null);

  const handleAddToCart = () => {
    addinCart(product);
    setShowAddedMessage(true);

    if (messageTimeoutRef.current) {
      window.clearTimeout(messageTimeoutRef.current);
    }

    messageTimeoutRef.current = window.setTimeout(() => {
      setShowAddedMessage(false);
      messageTimeoutRef.current = null;
    }, 1500); 
  };

  return (
    <div className="shadow-md rounded-2xl bg-background-tertiary">
      <Link
        to="/products/$productId"
        params={{ productId: String(product.id) }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover rounded-md md-2 w-full"
        />
      </Link>

      <div className="rounded-2xl py-10 px-4 bg-gold-glow text-text">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p>{product.color}</p>

        <div className="flex justify-between mt-2.5">
          <p>R$ {product.price},00</p>

          <button
            className="cursor-pointer transition-transform duration-150 ease-in-out active:-translate-y-1 active:rotate-3"
            onClick={handleAddToCart}
          >
            <LiaShoppingCartSolid className="w-7 h-7 transition-transform duration-150 ease-in-out hover:scale-110" />
          </button>
        </div>

        <div
          className={`pointer-events-none inset-x-0 bottom-10 fixed flex justify-center transition-all duration-300 ease-in-out ${
            showAddedMessage 
              ? "opacity-100 translate-y-0 visible" 
              : "opacity-0 translate-y-2 visible:invisible"
          }`}
        >
          <span className="bg-black/80 text-white px-6 py-4 rounded-full shadow-lg">
            Adicionado ao carrinho
          </span>
        </div>
      </div>
    </div>
  );
};