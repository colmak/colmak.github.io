import { NextPage } from "next";
import { FaHome, FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

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
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between bg-ebony-clay-900 py-4 px-8">
        <div>
          <a
            title="icon"
            href="/"
            className="flex items-center text-2xl font-semibold text-white"
          >
            <FaHome className="mr-2" />
          </a>
        </div>
        <nav className="hidden gap-6 text-lg font-semibold lg:flex">
          {/* Rest of the menu options */}
          <a href="#about" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#projects" className="text-white hover:text-gray-300">
            Projects
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact
          </a>
          <a href="/Blog" className="text-white hover:text-gray-300">
          Blog
          </a>
        </nav>
        <div className="lg:hidden">
          <button
            title="button"
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 focus:outline-none"
            ref={buttonRef}
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900 opacity-75"
          onClick={closeMenu}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 flex w-64 transform flex-col bg-ebony-clay-900 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        ref={menuRef}
        
      >
        <a
          href="#about"
          className=" menu-option text-lg font-semibold text-white bg-ebony-clay-800 hover:bg-ebony-clay-800"
          onClick={handleItemClick}
        >
          Home
        </a>
        <a
          href="#about"
          className=" menu-option text-lg font-semibold text-white hover:bg-ebony-clay-800"
          onClick={handleItemClick}
        >
          About
        </a>
        <a
          href="#projects"
          className="menu-option text-lg font-semibold text-white hover:bg-ebony-clay-800"
          onClick={handleItemClick}
        >
          Projects
        </a>
        <a
          href="#contact"
          className="menu-option text-lg font-semibold text-white hover:bg-ebony-clay-800"
          onClick={handleItemClick}
        >
          Contact
        </a>
        <a
          href="/Blog"
          className="menu-option text-lg font-semibold text-white hover:bg-ebony-clay-800"
          onClick={handleItemClick}
        >
          Blog
        </a>
      </div>

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
