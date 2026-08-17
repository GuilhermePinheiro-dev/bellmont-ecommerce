import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { formatCurrency } from "../../../utils/format-currency";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../../components/contexts/CartContext/CartContext";
import { CEPForm } from "../../../components/CEPForm";
import { getDetailProductsById } from "../../../services/productService";

export const Route = createFileRoute("/_app/products/$productId")({
  loader: async ({ params }) => {
    const product = await getDetailProductsById(params.productId);
    return { product };
  },
  component: RouteComponent,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produto não encontrado - Produtos - Bellmont" }],
      };
    }

    return {
      meta: [{ title: `${loaderData?.product?.name} - Produtos - Bellmont` }],
    };
  },
  notFoundComponent: () => (
    <section className="container mb-10 pt-44 md:pt-54 pb-10 md:px-10 h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
      <p className=" text-gray-600 mb-6">
        O produto que você está procurando não existe ou foi removido
      </p>
      <Link
        to="/products"
        className="text-primary-dark hover:text-primary hover:underline"
      >
        Voltar para produtos
      </Link>
    </section>
  ),
});

function RouteComponent() {
  const { addinCart } = useContext(CartContext);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const messageTimeoutRef = useRef<number | null>(null);
  const { product } = useLoaderData({ from: Route.id });

  const handleAddToCart = () => {
    if (!product) return;

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

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        window.clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const originalPrice = product?.price ?? 0;
  const descountPrice = originalPrice * 0.9;
  const inInstalmentsPrice = originalPrice / 6;

  return (
    <section className="container mb-10 pt-44 md:pt-54 pb-10 md:px-10">
      <nav className="text-sm mb-15 ml-9">
        <Link to="/"> Home </Link> / <Link to="/products"> Produtos </Link> /{" "}
        <span className="font-semibold"> {product?.name} </span>
      </nav>

      <div className="flex flex-col md:flex-row justify-center gap-10 px-5 md:px-0 items-center">
        <img
          src={product?.images?.[0]}
          alt={product?.name}
          className="w-125 h-full md:h-106.25 bg-gold-glow rounded-2xl object-cover"
        />
        <div>
          <h1 className="font-bold text-4xl mb-1 font-title">
            {product?.name}
          </h1>
          <p className="mb-2">Cor: {product?.colors?.[0]}</p>

          <p className="line-through text-sm text-text-muted">
            {formatCurrency(originalPrice)}
          </p>
          <p className="font-bold text-3xl mb-2">
            {formatCurrency(descountPrice)} no PIX
          </p>

          <p className="text-text-muted text-sm">
            Você economiza: <span className="font-semibold">10%</span>
          </p>

          <p className="mb-2">
            ou <span className="font-semibold text-text">6x</span> de{" "}
            <span className="font-semibold text-text">
              {formatCurrency(inInstalmentsPrice)}
            </span>
          </p>

          <p className="max-w-125 mb-3 my-5">{product?.description}</p>
          <div className="mb-5">
            <p className="text-sm mb-2">Calcular o prazo de entrega</p>

            <CEPForm />
          </div>

          <button
            className="w-full p-5 bg-text text-surface rounded-md cursor-pointer"
            onClick={handleAddToCart}
          >
            Adicionar ao carrinho
          </button>
        </div>
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
    </section>
  );
}
