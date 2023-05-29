// Home.tsx
import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";


const Home: NextPage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleItemClick = () => {
    closeMenu();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      buttonRef.current &&
      !buttonRef.current.contains(target)
    ) {
      closeMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleOutsideClick]); // Add handleOutsideClick to the dependency array

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <Menu
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        handleItemClick={handleItemClick}
      />

      <main className="flex min-h-screen flex-col items-center justify-center bg-ebony-clay-950">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Roland <span className="text-mandy-500">Van</span> Duine
          </h1>
          <p className="text-2xl text-white">WIP</p>
        </div>
      </main>
    </>
  );
};

export default Home;
