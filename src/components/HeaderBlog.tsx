// Header.tsx
import React from 'react';
import { FaHome, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import scroll from 'scroll';

interface HeaderProps {
  toggleMenu: () => void;
}

const HeaderBlog: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const options = {
        duration: 500, // Adjust duration as needed
        easing: 'out-quart', // Choose easing function if needed
      };

      scroll.top(section, section.offsetTop, options);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-ebony-clay-900 py-4 px-8">
      <div>
        <Link href="/" passHref>
          <button className="flex items-center text-2xl font-semibold text-white" onClick={() => scrollToSection("home")}>
            <FaHome className="mr-2" />
          </button>
        </Link>
      </div>
      <nav className="hidden gap-6 text-lg font-semibold lg:flex">
        
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

export default HeaderBlog;