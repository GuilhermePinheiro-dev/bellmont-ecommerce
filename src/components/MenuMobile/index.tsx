import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuX } from "react-icons/lu";
import { Link } from "@tanstack/react-router";
import { GoPerson } from "react-icons/go";
import type { NavLinks } from "../Header";

interface MenuMobileProps {
  navLinks: NavLinks[]
}


export const MenuMobile = ({ navLinks }: MenuMobileProps) => {
  const [valueMenu, menuIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menu"
        className="text-[20px] hover:text-primary-light transition-colors ease-in-out cursor-pointer flex items-center
        md:hidden"
        onClick={() => menuIsOpen(!valueMenu)}
      >
        <RxHamburgerMenu />
      </button>

      <div
        className={`${valueMenu ? " bg-black/70 visible" : "bg-transparent invisible"} fixed bottom-0 left-0 top-0 right-0 duration-300 z-40`}
        onClick={() => menuIsOpen(!valueMenu)}
      >
        <div
          className={`${valueMenu ? "translate-x-0" : "-translate-x-full"} h-full absolute top-0 bottom-0 pt-3 bg-background transition-all ease-in-out duration-600 w-full z-50`}
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center">
            <nav className="flex justify-between items-center bg-background-tertiary w-full h-19 px-5">
                <Link to="/sign-up"
                className="flex items-center gap-3">
                  <GoPerson 
                  className="h-6 w-6"/>
                <p>Olá! Faça seu login!</p>
                </Link>


              <LuX 
              className="cursor-pointer text-3xl"
              onClick={() => menuIsOpen(!valueMenu)}/>
            </nav>
          </header>

          <section>
            <ul className="py-2 px-5 flex flex-col gap-3" 
            >
            {navLinks.map( link => (
              <li key={link.name} onClick={() => menuIsOpen(!valueMenu)}
              className="self-start">
                <Link to={link.href}>
                  {link.name}
                </Link>
              </li>
            ))}

            <li>
              <Link to="/about" className="self-start" onClick={() => menuIsOpen(!valueMenu)}>Sobre</Link>
            </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};
