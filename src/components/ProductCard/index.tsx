import { Link } from "@tanstack/react-router";
import type { Product } from "../../interfaces/product";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

interface Productprops {
  product: Product;
}

export const ProductCard = ({ product }: Productprops) => {
  const { addinCart } = useContext(CartContext)

  return (
    <div className="shadow-md rounded-2xl bg-background-tertiary">
      <Link
        to="/products/$productId"
        params={{ productId: String(product.id) }}
      >
        <img
          src={product.image}
          alt={product.name}
          className=" object-cover rounded-md md-2 w-full"
        />
      </Link>

      <div className="rounded-2xl py-10 px-4 bg-gold-glow text-text">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p>{product.color}</p>

        <div className="flex justify-between mt-2.5">
          <p>R$ {product.price},00</p>

          <button className="cursor-pointer" onClick={() => addinCart(product)}>
            <LiaShoppingCartSolid className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};
