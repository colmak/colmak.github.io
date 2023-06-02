// Home.tsx
import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Separator from "../components/Separator";
import Image from "next/image";

import Projects from "../components/Projects";

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

      <main
        className="flex min-h-screen flex-col items-center justify-center bg-ebony-clay-950"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container flex flex-col items-start justify-center gap-12 px-4 py-16">
          <div className="flex items-center justify-center">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Hi, I'm <span className="text-mandy-500">Roland</span>.
              </h1>
              <p className="text-2xl text-white">
                I'm a multi-disciplinary professional bridging engineering, business, and the humanities.
              </p>
              <p className="text-2xl text-white">
                Together, let's shape a future where technology optimizes experiences, empowers innovation, and drives collective success.
              </p>
              <p className="text-2xl text-white">
                Embrace the challenge, work hard, and watch your dreams transform into reality.
              </p>
            </div>
            {/* <Image 
              src="/images/rvdpic.png" // Replace with the path to your image
              alt="Roland Van Duine"
              className="w-64 h-64"
              width={1274}
              height={660}
            /> */}
          </div>
        </div>
      </main>

      <Separator text="Projects"/>
      <Projects /> 

 
    </>
  );
};

export default Home;
