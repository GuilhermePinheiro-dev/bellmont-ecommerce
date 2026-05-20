import { ProductCard } from "../ProductCard";
import type { Product } from "../../interfaces/product";

interface ProductListprops {
  products: Product[];
}
export const ProductList = ({ products }: ProductListprops) => {
  return (
    <section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] mb-10">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </section>
  );
};
