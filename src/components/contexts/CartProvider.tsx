import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/product";
import { CartContext } from "./CartContext";

interface CartProviderProps {
  children: React.ReactNode;
}

export interface ProductCart extends Product {
  quantity: number;
}

const localStorageKey = "@bellmont:cart"

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ProductCart[]>(() => {
    const cartFromLocalStorage = localStorage.getItem(localStorageKey);
    return cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : []
  });

  useEffect(()=> {
    localStorage.setItem(localStorageKey, JSON.stringify(cart))
  }, [cart])

  function addinCart(product: Product): void {
    const productExistingInCart = cart.find((item) => item.id === product.id);

    let newCart;

    if (productExistingInCart) {
      newCart = cart.map((itemIncart) =>
        itemIncart.id === product.id
          ? { ...itemIncart, quantity: itemIncart.quantity + 1 }
          : itemIncart,
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
  }

  function removeFromCart(productID: number): void {
    setCart(cart.filter((itemInCart) => itemInCart.id !== productID));
  }

  function incrementQuantity(product: ProductCart): void {
    updateQuantity(product, product.quantity + 1);
  }
  function decrementQuantity(product: ProductCart): void {
    updateQuantity(product, product.quantity - 1);
  }

  function updateQuantity(product: ProductCart, newQuantity: number) {
    if (newQuantity <= 0) return;

    const productExistingInCart = cart.find((item) => item.id === product.id);

    if(!productExistingInCart) return

    const newCart = cart.map((itemIncart) =>
        itemIncart.id === product.id
          ? { ...itemIncart, quantity: newQuantity }
          : itemIncart,
      );

      setCart(newCart)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addinCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
