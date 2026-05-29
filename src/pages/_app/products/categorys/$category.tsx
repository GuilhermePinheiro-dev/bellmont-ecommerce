import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductList } from "../../../../components/ProductList";
import { products } from "../../../../mocks/products";

export const Route = createFileRoute("/_app/products/categorys/$category")({
  component: RouteComponent,
});

function RouteComponent() {
  const { category } = Route.useParams();

  const filteredProducts = products.filter(
    (product) =>
      (product.category.name ?? "").toLowerCase() === category.toLowerCase(),
  );

  return (
    <section className="container pt-34 pb-1 px-2 md:px-10">
      {filteredProducts.length == 0 ? (
        <section className="container mb-25 md:pt-54 pb-10 md:px-10 h-[60vh] flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">
            Produto não encontrado para esta categoria
          </h1>
          <p className=" text-gray-600 mb-6">
            A categoria para o produto que você está procurando não existe ou
            foi removido
          </p>
          <Link
            to="/products"
            className="text-primary-dark hover:text-primary hover:underline"
          >
            Voltar para produtos
          </Link>
        </section>
      ) : (
        <>
          <h1 className="text-black text-3xl text-center mb-3 mt-10">
            Lista de produtos
          </h1>
          <h2 className="text-black text-xl text-center mb-16">
            Conforto e elegância do simples ao extraordinário
          </h2>
          <ProductList products={filteredProducts} />
        </>
      )}
    </section>
  );
}
