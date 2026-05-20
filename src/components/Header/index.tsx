import { GoPerson } from "react-icons/go";
import { GoQuestion } from "react-icons/go";
import { IoBagOutline } from "react-icons/io5";
import logoBellmont from "@/assets/img/logo-bellmont.png";
import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <div className="relative">
      <header className="fixed top-6 left-0 right-0 z-10 mx-10 ">
        <div className="max-w-330 mx-auto flex justify-between bg-surface border border-glass-border items-center px-6 rounded-3xl text-text mt-5">
          <Link to="/">
            <img src={logoBellmont} alt="logo bellmont" className="max-w-30" />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-10 ">
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary-light transition-colors ease-in-out"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-light transition-colors ease-in-out"
                >
                  Nossas lojas
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <ul className="flex gap-4 sm:gap-10 text-[20px]">
              <li>
                <Link
                  to="/sign-up"
                  className="hover:text-primary-light transition-colors ease-in-out"
                >
                  <GoPerson />
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-light transition-colors ease-in-out"
                >
                  <GoQuestion />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-light transition-colors ease-in-out"
                >
                  <IoBagOutline />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};
