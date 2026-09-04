import { createFileRoute } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { Logo } from "../../components/Logo";
import { GoInfo, GoLock } from "react-icons/go";
import { CartContext } from "../../components/contexts/CartContext/CartContext";
import { formatCurrency } from "../../utils/format-currency";
import z from "zod";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Address } from "../../interfaces/address";

export const Route = createFileRoute("/checkout/")({
  component: RouteComponent,
});

const shippinAdressFormSchema = z.object({
  street: z.string().nonempty("A rua é obrigatória."),
  number: z.coerce.number().min(1, "O número é obrigatório."),
  complement: z.string().optional(),
  city: z.string().nonempty("A cidade é obrogatória."),
  state: z.string().nonempty("O estado é obrigatório"),
  neighborhood: z.string().nonempty("O bairro é obrigatório."),
  cep: z.string().min(8, "CEP inválido"),
});

type ShippingAdressFormData = z.infer<typeof shippinAdressFormSchema>;

async function gepCep(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return await response.json();
}

const FRETE_POR_REGIAO: Record<string, number> = {
  Norte: 39.9,
  Nordeste: 29.9,
  "Centro-Oeste": 24.9,
  Sudeste: 14.9,
  Sul: 19.9,
};

function RouteComponent() {
  const { cart } = useContext(CartContext);
  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
  const {
    reset,
    setValue,
    watch,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAdressFormData>({
    resolver: zodResolver(
      shippinAdressFormSchema,
    ) as unknown as Resolver<ShippingAdressFormData>,
    defaultValues: {
      street: "" as any,
      number: "" as any,
      complement: "" as any,
      neighborhood: "" as any,
      city: "" as any,
      state: "" as any,
      cep: "" as any,
    },
    mode: "onBlur",
  });

  const [address, setAddress] = useState<Address | null>(null);

  const cepValue = watch("cep");

  useEffect(() => {
    if (cepValue.length != 8) return;

    async function fetchData() {
      const data = await gepCep(cepValue);

      const shippingCost = FRETE_POR_REGIAO[data.regiao];

      setAddress({
        ...data,
        shippingCost,
      });

      setValue("street", data.logradouro);
      setValue("neighborhood", data.bairro);
      setValue("city", data.localidade);
      setValue("state", data.uf);
    }

    fetchData();
  }, [cepValue]);
  return (
    <div className="min-h-screen bg-background-secondary text-text pt-5">
      <header className="container flex items-center justify-between h-16 py-10 bg-surface">
        <Logo />

        <div className="flex items-center gap-2">
          <GoLock className="text-2xl" />
          <p>100% Seguro</p>
        </div>
      </header>

      <div className="container py-8 md:py-12">
        <section className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <form
            className="max-w-3xl space-y-8"
            id="checkout-form"
            // onSubmit={handleSubmit}
          >
            <div className="rounded-sm bg-surface p-5 shadow-sm md:p-6">
              <h1 className="text-xl font-bold">Identificação</h1>
              <p className="mt-2 text-sm text-text-muted">
                roberto.dias@gmail.com
              </p>
              <p className="text-sm text-text-muted">Roberto Dias</p>

              <div className="mt-4 border border-border-light bg-background-secondary px-4 py-3">
                <div className="flex gap-3">
                  <GoInfo className="mt-0.5 shrink-0 text-xl text-text-muted" />
                  <div className="text-sm leading-tight">
                    <p>
                      Antes de continuar, verifique se o telefone para contato
                      está correto.
                    </p>
                    <p className="mt-1 font-bold">13 82328378</p>
                  </div>
                </div>
              </div>
              <button
                className="mt-3 text-sm font-semibold text-info underline underline-offset-2"
                type="button"
              >
                editar telefone
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold">Informe seu endereço</h2>
              <div>
                <div className="mt-5 flex w-full gap-2">
                  <label className="sr-only" htmlFor="zipCode">
                    CEP
                  </label>
                  <input
                    className="min-w-0 flex-1 border border-border bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-gold-glow"
                    id="zipCode"
                    inputMode="numeric"
                    placeholder="CEP"
                    type="text"
                    {...register("cep")}
                  />
                  <button
                    className="bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-text-soft cursor-pointer"
                    type="button"
                  >
                    Buscar
                  </button>
                </div>
                {errors.cep && (
                  <p className="text-danger text-sm mt-1">
                    {errors.cep.message}
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    htmlFor="street"
                  >
                    Endereço
                  </label>
                  <input
                    className="w-full border border-border bg-surface px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-gold-glow"
                    id="street"
                    placeholder="Rua, avenida, etc."
                    type="text"
                    {...register("street")}
                  />
                  {errors.street && (
                    <p className="text-danger text-sm mt-1">
                      {errors.street.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-2 block text-sm font-semibold"
                      htmlFor="number"
                    >
                      Número
                    </label>
                    <input
                      className="w-full border border-border bg-surface px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-gold-glow"
                      id="number"
                      placeholder="Número"
                      type="text"
                      {...register("number")}
                    />
                    {errors.number && (
                      <p className="text-danger text-sm mt-1">
                        {errors.number.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="mb-2 block text-sm font-semibold"
                      htmlFor="complement"
                    >
                      Complemento
                    </label>
                    <input
                      className="w-full border border-border bg-surface px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-gold-glow"
                      id="complement"
                      placeholder="Apartamento, bloco, etc."
                      type="text"
                      {...register("complement")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    htmlFor="neighborhood"
                  >
                    Bairro
                  </label>
                  <input
                    className="w-full border border-border bg-surface px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-gold-glow"
                    id="neighborhood"
                    placeholder="Bairro"
                    type="text"
                    {...register("neighborhood")}
                  />
                  {errors.neighborhood && (
                    <p className="text-danger text-sm mt-1">
                      {errors.neighborhood.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-2 block text-sm font-semibold"
                      htmlFor="city"
                    >
                      Cidade
                    </label>
                    <input
                      className="w-full border border-border bg-surface px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-gold-glow"
                      id="city"
                      placeholder="Cidade"
                      type="text"
                      {...register("city")}
                    />
                    {errors.city && (
                      <p className="text-danger text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="mb-2 block text-sm font-semibold"
                      htmlFor="state"
                    >
                      Estado
                    </label>
                    <input
                      className="w-full border border-border bg-surface px-3 py-3 text-sm uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-gold-glow"
                      id="state"
                      maxLength={2}
                      placeholder="UF"
                      type="text"
                      {...register("state")}
                    />
                    {errors.state && (
                      <p className="text-danger text-sm mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {address && (
              <fieldset>
                <legend className="text-xl font-bold">
                  Escolha a forma de entrega
                </legend>
                <label className="mt-5 flex cursor-pointer items-center justify-between border border-transparent bg-transparent p-3 transition hover:border-border-light hover:bg-surface">
                  <span className="flex items-center gap-3">
                    <input
                      className="h-4 w-4 accent-primary"
                      defaultChecked
                      name="delivery"
                      type="checkbox"
                      value="express"
                    />
                    <span>
                      <span className="block text-sm font-semibold">
                        Entrega rápida
                      </span>
                      <span className="block text-xs text-text-muted">
                        Receba em até 5 dias úteis
                      </span>
                    </span>
                  </span>
                  <span className="text-sm font-bold">
                    {formatCurrency(address.shippingCost)}
                  </span>
                </label>
              </fieldset>
            )}
          </form>

          <aside className="overflow-hidden bg-surface shadow-sm lg:sticky lg:top-6">
            <div className="border-b border-border-light p-5">
              <h2 className="text-xl font-bold">Resumo do pedido</h2>

              <div className="mt-5 max-h-80 space-y-4 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="py-5 text-sm text-text-muted">
                    Seu carrinho está vazio.
                  </p>
                ) : (
                  cart.map((product) => (
                    <article className="flex gap-3" key={product.id}>
                      <div className="h-14 w-14 shrink-0 overflow-hidden bg-background-tertiary">
                        {product.images[0] && (
                          <img
                            alt={product.name}
                            className="h-full w-full object-cover"
                            src={product.images[0]}
                          />
                        )}
                      </div>
                      <div className="min-w-0 text-sm leading-tight">
                        <h3 className="truncate font-semibold">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-xs text-text-muted">
                          Quantidade: {product.quantity}
                        </p>
                        <p className="mt-1 font-bold">
                          {formatCurrency(product.price * product.quantity)} à
                          vista
                        </p>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>

            <div className="bg-background-secondary p-5 text-sm">
              <dl className="space-y-2">
                <div className="flex justify-between gap-4">
                  <dt>Subtotal</dt>
                  <dd className="font-semibold">{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Frete</dt>
                  <dd className="font-semibold">
                    {address ? formatCurrency(address.shippingCost) : "A calcular"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Total</dt>
                  <dd className="font-bold">
                    {formatCurrency(subtotal + (address ? address.shippingCost : 0))} à vista
                  </dd>
                </div>
              </dl>
              <button
                className="mt-5 w-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-text-soft disabled:cursor-not-allowed disabled:bg-text-disabled"
                disabled={cart.length === 0}
                form="checkout-form"
                type="submit"
              >
                Fechar pedido
              </button>
            </div>
          </aside>
        </section>
      </div>

      <footer className="p-4 bg-gold-soft">
        <p className="text-center">
          Preços e condições exclusivos para o site www.iplace.com.br e para o
          televendas, podendo sofrer alterações sem prévia notificação. Global
          Distribuição de Bens de Consumo LTDA / www.iplace.com.br / BR 116, km
          223,5, N° 7350 / Dois Irmãos - RS / CEP 93950-000 / CNPJ:
          89.237.911/0001-40
        </p>
      </footer>
    </div>
  );
}
