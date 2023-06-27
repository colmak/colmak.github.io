// Header.tsx
import React from 'react';
import { FaHome, FaBars } from 'react-icons/fa';
import Link from 'next/link';

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-ebony-clay-900 py-4 px-8">
      <div>
        <Link href="/" passHref>
          <span className="flex items-center text-2xl font-semibold text-white">
            <FaHome className="mr-2" />
          </span>
        </Link>
      </div>
      <nav className="hidden gap-6 text-lg font-semibold lg:flex">
        <button
          onClick={() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="text-white hover:text-gray-300"
        >
          Projects
        </button>
        <button
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="text-white hover:text-gray-300"
        >
          About
        </button>
        <button
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="text-white hover:text-gray-300"
        >
          Contact
        </button>
        <Link href="/blog" passHref>
          <span className="text-white hover:text-gray-300">Blog</span>
        </Link>
      </nav>
      <div className="lg:hidden">
        <button
          title="button"
          onClick={toggleMenu}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          <FaBars className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
