import { useEffect, useState } from "react";
import type { Product } from "../../../interfaces/product";
import { CartContext } from "./CartContext";

interface CartProviderProps {
  children: React.ReactNode;
}

export interface ProductCart extends Product {
  quantity: number;
}

interface ProductLike {
  id: number;
  name: string;
  description?: string;
  price: number;
  images?: string[];
  image?: string;
  sizes?: string[];
  categoryId?: number;
  slug?: string;
  stock?: number;
  active?: boolean;
  color?: string[];
  category?: {
    id?: number;
    name?: string;
  };
}

const localStorageKey = "@bellmont:cart";

const normalizeProduct = (product: ProductLike): ProductCart => ({
  id: product.id,
  name: product.name,
  description: product.description ?? "",
  price: product.price,
  images:
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [],
  sizes:
    Array.isArray(product.sizes) && product.sizes.length > 0
      ? product.sizes
      : ["Único"],
  categoryId: product.categoryId ?? product.category?.id ?? 0,
  slug:
    product.slug ??
    product.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-"),
  stock: product.stock ?? 99,
  active: product.active ?? true,
  color: product.color ?? [],
  quantity: 1,
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ProductCart[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const cartFromLocalStorage = window.localStorage.getItem(localStorageKey);

      if (!cartFromLocalStorage) {
        return [];
      }

      const parsedCart = JSON.parse(cartFromLocalStorage) as ProductLike[];

      return Array.isArray(parsedCart)
        ? parsedCart.map((item) => normalizeProduct(item))
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(localStorageKey, JSON.stringify(cart));
  }, [cart]);

  function addinCart(product: Product): void {
    const normalizedProduct = normalizeProduct(product);

    setCart((currentCart) => {
      const productExistingInCart = currentCart.find(
        (item) => item.id === normalizedProduct.id,
      );

      if (productExistingInCart) {
        return currentCart.map((itemInCart) =>
          itemInCart.id === normalizedProduct.id
            ? { ...itemInCart, quantity: itemInCart.quantity + 1 }
            : itemInCart,
        );
      }

      return [...currentCart, { ...normalizedProduct, quantity: 1 }];
    });
  }

  function removeFromCart(productID: number): void {
    setCart((currentCart) =>
      currentCart.filter((itemInCart) => itemInCart.id !== productID),
    );
  }

  function incrementQuantity(product: ProductCart): void {
    updateQuantity(product, product.quantity + 1);
  }

  function decrementQuantity(product: ProductCart): void {
    updateQuantity(product, product.quantity - 1);
  }

  function updateQuantity(product: ProductCart, newQuantity: number) {
    if (newQuantity <= 0) {
      return;
    }

    setCart((currentCart) => {
      const productExistingInCart = currentCart.find(
        (item) => item.id === product.id,
      );

      if (!productExistingInCart) {
        return currentCart;
      }

      return currentCart.map((itemInCart) =>
        itemInCart.id === product.id
          ? { ...itemInCart, quantity: newQuantity }
          : itemInCart,
      );
    });
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
