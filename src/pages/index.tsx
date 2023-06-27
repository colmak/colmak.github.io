// Home.tsx
import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Separator from '../components/Separator';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';

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

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleOutsideClick]); // Add handleOutsideClick to the dependency array

  return (
    <>
      <Head>
        <title>Roland Van Duine</title>
        <meta property="og:image" content="/images/background.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Header toggleMenu={toggleMenu} />
      <Menu isMenuOpen={isMenuOpen} closeMenu={closeMenu} handleItemClick={handleItemClick} />

      <main
        className="flex min-h-screen items-start justify-center bg-ebony-clay-950"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container flex items-center justify-start gap-12 px-4 py-16 ">
          <div className="w-1/2">
            <h1 className="text-5xl pb-4 font-extrabold tracking-tight text-white sm:text-[5rem]">
              Hi, I&apos;m <span className="text-mandy-500">Roland</span>.
            </h1>
            <p className="text-lg text-white">
              I create a future where technology optimizes experiences, empowers innovation, and drives collective success.
            </p>

            <p className="text-lg text-white">
              Embrace the challenge, work hard, and watch your dreams transform into reality.
            </p>
          </div>
        </div>
      </main>

      <Separator id="projects" text="Projects" />
      <Projects />

      <Separator id="about" text="About" />
      <About />

      <Separator id="contact" text="Contact" />
      <Contact />
    </>
  );
};

export default Home;
