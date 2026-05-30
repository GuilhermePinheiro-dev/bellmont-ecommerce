import { createFileRoute } from "@tanstack/react-router";
import { ProductList } from "../../../components/ProductList";
import { products } from "../../../mocks/products";

export const Route = createFileRoute("/_app/products/")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Produtos - Bellmont" }],
  })
});

function RouteComponent() {
  return (
    <div className="container pt-34 pb-1 px-2 md:px-10">
      <h1 className="text-black text-3xl text-center mb-3 mt-10">
        Lista de produtos
      </h1>
      <h2 className="text-black text-xl text-center mb-16">
        Conforto e elegância do simples ao extraordinário
      </h2>

      {products.length == 0 ? (
        <p className="text-center">Produto não encontrado</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
