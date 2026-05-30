import { IoBagOutline } from "react-icons/io5";

interface CartButtonProps {
    onClick?: () => void,
}

export const CartButton = ({onClick}: CartButtonProps) => {
  return (
    <button
      type="button"
      aria-label="Abrir carrinho"
      className="text-[20px] hover:text-primary-light transition-colors ease-in-out cursor-pointer flex items-center"
      onClick={onClick}
    >
      <IoBagOutline />
    </button>
  );
};
