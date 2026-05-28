import { GoPerson } from "react-icons/go";
import { GoQuestion } from "react-icons/go";
import logoBellmont from "@/assets/img/logo-bellmont.png";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "../ShoppingCart";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { MenuMobile } from "../MenuMobile";


export interface NavLinks{
  name: string,
  href: string,
}

const navLinks: NavLinks[] = [
  {name: "Produtos", href: "/products" },
  {name: "Nossas lojas", href: "/our-stores" },
]

export const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="relative">
      <header className="fixed top-6 left-0 right-0 z-10 mx-10 ">
        <div className="max-w-330 mx-auto flex justify-between bg-surface border border-glass-border items-center px-6 rounded-3xl text-text mt-5">
          <Link to="/">
            <img src={logoBellmont} alt="logo bellmont" className="max-w-30" />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-10">
              {navLinks.map(link => (
                <li key={link.name}
                className="hover:text-primary-light transition-colors ease-in-out">
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav>
            <ul className="flex gap-4 sm:gap-10 text-[20px] items-center">
              <li>
                <MenuMobile navLinks={navLinks} />
              </li>
              <li className="hidden md:block">
                <Link
                  to="/sign-up"
                  className="hover:text-primary-light transition-colors ease-in-out"
                >
                  <GoPerson />
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  to="/about"
                  className="hover:text-primary-light transition-colors ease-in-out"
                >
                  <GoQuestion />
                </Link>
              </li>
              <li className="relative">
                <ShoppingCart />
                {cart.length > 0 && (
                  <div className="absolute w-4 h-4 rounded-full -top-1 -right-2 bg-danger-light text-white text-[10px] text-center">
                    {cart.length}
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};
