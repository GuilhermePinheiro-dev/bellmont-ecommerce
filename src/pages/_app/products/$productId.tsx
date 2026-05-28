import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "../../../mocks/products";
import { formatCurrency } from "../../../utils/format-currency";
import { useContext } from "react";
import { CartContext } from "../../../components/contexts/CartContext";
import { CEPForm } from "../../../components/CEPForm";

export const Route = createFileRoute("/_app/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { addinCart } = useContext(CartContext);
  const { productId } = Route.useParams();
  const filteredProduct = products.find(
    (product) => product.id === Number(productId),
  );

  if (!filteredProduct) return;
  const originalPrice = filteredProduct?.price ?? 0;
  const descountPrice = originalPrice * 0.9;
  const inInstalmentsPrice = originalPrice / 6;

  return (
    <section className="container mb-10 pt-44 md:pt-54 pb-10 md:px-10">
      <nav className="text-sm mb-15 ml-9">
        <Link to="/"> Home </Link> / <Link to="/products"> Produtos </Link> /{" "}
        <span className="font-semibold"> {filteredProduct?.name} </span>
      </nav>

      <div className="flex flex-col md:flex-row justify-center gap-10 px-5 md:px-0 items-center">
        <img
          src={filteredProduct?.image}
          alt={filteredProduct?.name}
          className="w-125 h-full md:h-106.25 bg-gold-glow rounded-2xl object-cover"
        />
        <div>
          <h1 className="font-bold text-4xl mb-1 font-title">
            {filteredProduct?.name}
          </h1>
          <p className="mb-2">Cor: {filteredProduct?.color}</p>

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

          <p className="max-w-125 mb-3 my-5">{filteredProduct?.description}</p>
          <div className="mb-5">
            <p className="text-sm mb-2">Calcular o prazo de entrega</p>

            <CEPForm />
          </div>

          <button
            className="w-full p-5 bg-text text-surface rounded-md cursor-pointer"
            onClick={() => addinCart(filteredProduct)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </section>
  );
}
