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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    console.log('section:', section);
    if (section) {
      const options = {
        duration: 500, // Adjust duration as needed
        easing: 'out-quart', // Choose easing function if needed
      };
  
      console.log('scrolling to section:', sectionId);
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      closeMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Roland Van Duine</title>
        <meta property="og:image" content="/images/background.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Header toggleMenu={toggleMenu} closeMenu={closeMenu} />
      <Menu isMenuOpen={isMenuOpen} closeMenu={closeMenu} handleItemClick={handleItemClick} />

      <main
        id="home"
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
            <button
              className="text-white hover:text-gray-300"
              onClick={() => scrollToSection("projects")}
            >
              WIP
            </button>
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