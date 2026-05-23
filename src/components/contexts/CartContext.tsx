import { createContext } from "react";
import type { Product } from "../../interfaces/product";
import type { ProductCart } from "./CartProvider";

interface CartContextType {
    cart: ProductCart[],
    addinCart: (product: Product ) => void, 
    removeFromCart: (productID: number ) => void, 
    incrementQuantity: (product: ProductCart) => void,
    decrementQuantity: (product: ProductCart) => void,
}

export const CartContext = createContext({} as CartContextType)


