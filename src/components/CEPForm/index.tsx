import { useState } from "react";
import { CEPUseForm } from "./cep-form.schema";
import type { address } from "../../interfaces/address";
import { formatCurrency } from "../../utils/format-currency";

const SHIPPING_BY_REGION: Record<string, number> = {
  Norte: 39.9,
  Nordeste: 29.9,
  "Centro-Oeste": 24.9,
  Sudeste: 14.9,
  Sul: 19.9,
};

export const CEPForm = () => {
  const { register, handleSubmit, errors, isSubmitting, reset } = CEPUseForm();
  const [address, setAddress] = useState<address | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  const onSubmit = async ({ cep }: { cep: string }) => {
    setAddress(null)
    setAddressError(null)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

        if(data.erro){
            setAddressError("CEP não encontrado")
            return
        }

      const shippingCost = SHIPPING_BY_REGION[data.regiao];
      setAddress({ ...data, shippingCost });

      reset();
    } catch (error) {
      setAddressError("Erro ao buscar CEP");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Insira seu CEP"
              className={`w-full rounded-md border p-3 ${
                errors.cep
                  ? "border-danger focus:outline-danger"
                  : "border-border-strong"
              }`}
              {...register("cep")}
            />
            {errors.cep && (
              <span className="text-sm text-danger mt-1">
                {errors.cep.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-text py-3 px-6 rounded-md text-surface cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Calculando..." : "Calcular"}
          </button>
        </div>
      </form>
        {addressError && (
            <div className="mt-4">
                <p className="text-sm text-danger mt-1">{addressError}</p>
            </div>
        )}

      {address && (
        <div className="mt-4">
          <p>
            <strong>Região: </strong> {address.regiao}
          </p>
          <p>
            <strong>Valor da entrega: </strong>{" "}
            {formatCurrency(address.shippingCost)}
          </p>
        </div>
      )}
    </>
  );
};
