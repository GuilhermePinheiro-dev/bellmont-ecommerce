import { createFileRoute } from "@tanstack/react-router";
import { ProductList } from "../../../components/ProductList";
import { getProducts } from "../../../services/productService";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../../../interfaces/product";

export const Route = createFileRoute("/_app/products/")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Produtos - Bellmont" }],
  }),
});

function RouteComponent() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const hasFetchedProducts = useRef(false);

  useEffect(() => {
    if (hasFetchedProducts.current) return;
    hasFetchedProducts.current = true;

    loadMore();
  }, []);

  async function loadMore() {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await getProducts({ page });
      const nextProducts = Array.isArray(response.data) ? response.data : [];

      setProducts((prev) => [...prev, ...nextProducts]);

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container pt-34 pb-1 px-2 md:px-10 text-center">
      <h1 className="text-black text-3xl text-center mb-3 mt-10">
        Lista de produtos
      </h1>
      <h2 className="text-black text-xl text-center mb-16">
        Conforto e elegância do simples ao extraordinário
      </h2>

      {isLoading && products.length === 0 ? (
        <div className="flex justify-center items-center min-h-100">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#212A2F]"
          ></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center">Produto não encontrado</p>
      ) : (
        <>
          <ProductList products={products} />

          {hasMore && (
            <button
              className="bg-text-soft py-3.5 px-7 rounded-xl cursor-pointer mx-auto text-white mb-5 disabled:text-text-muted disabled:cursor-not-allowed"
              onClick={loadMore}
              disabled={isLoading}
            >
              { isLoading ? "Carregando..." : "Carregar mais" }
            </button>
          )}
        </>
      )}
    </div>
  );
}
