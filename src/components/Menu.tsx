// Menu.tsx
import React from 'react';
import Link from 'next/link';

interface MenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void; // Add this line
  handleItemClick: () => void;
}

const Menu: React.FC<MenuProps> = ({ isMenuOpen, closeMenu, handleItemClick }) => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      closeMenu();
    }
  };

  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 opacity-75" onClick={closeMenu} />
      )}
      <div
        className={`fixed inset-y-0 left-0 flex w-64 transform flex-col bg-ebony-clay-900  ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="menu-option bg-ebony-clay-800 text-lg font-semibold text-white hover:bg-ebony-clay-800"
          onClick={() => scrollToSection('projects')}
        >
          Projects
        </button>
        <button
          className="menu-option text-lg font-semibold text-white hover:bg-ebony-clay-800"
          onClick={() => scrollToSection('about')}
        >
          About
        </button>
        <button
          className="menu-option text-lg font-semibold text-white hover:bg-ebony-clay-800"
          onClick={() => scrollToSection('contact')}
        >
          Contact
        </button>
        <Link href="/blog">
          <button
            className="menu-option text-lg font-semibold text-white hover:bg-ebony-clay-800"
            onClick={handleItemClick}
          >
            Blog
          </button>
        </Link>
      </div>
    </>
  );
};

export default Menu;