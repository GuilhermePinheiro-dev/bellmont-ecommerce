import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductList } from "../../../../components/ProductList";
import { getProducts } from "../../../../services/productService";
import { useEffect, useState } from "react";
import type { Product } from "../../../../interfaces/product";

export const Route = createFileRoute("/_app/products/categorys/$category")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Produtos - Bellmont" }],
  }),
});

function RouteComponent() {
  const { category } = Route.useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    setProducts([]);
    setIsLoading(true);
    setHasError(false);

    async function loadProducts() {
      try {
        const response = await getProducts({ page: 1, limit: 100 });

        if (isCurrent) {
          setProducts(
            response.data.filter((product) => {
              const categoryName =
                product.categoryId === 1
                  ? "Perfumes"
                  : product.categoryId === 2
                    ? "Relogios"
                    : product.categoryId === 3
                      ? "Joias"
                      : product.categoryId === 4
                        ? "Roupas"
                        : "";

              return categoryName.toLowerCase() === category.toLowerCase();
            }),
          );
        }
      } catch (error) {
        console.error("Erro ao carregar produtos da categoria:", error);
        if (isCurrent) setHasError(true);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadProducts();

    return () => {
      isCurrent = false;
    };
  }, [category]);

  return (
    <section className="container pt-34 pb-1 px-2 md:px-10">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#212A2F]" />
        </div>
      ) : hasError || products.length === 0 ? (
        <section className="container mb-25 md:pt-54 pb-10 md:px-10 h-[60vh] flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">
            {hasError
              ? "Não foi possível carregar os produtos"
              : "Produto não encontrado para esta categoria"}
          </h1>
          <p className=" text-gray-600 mb-6">
            {hasError
              ? "Tente novamente mais tarde"
              : "A categoria para o produto que você está procurando não existe ou foi removido"}
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
          <ProductList products={products} />
        </>
      )}
    </section>
  );
}
