import { FaHome, FaBars } from "react-icons/fa";
import Link from "next/link";

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-ebony-clay-900 py-4 px-8">
      <div>
        <Link
          title="icon"
          href="/"
          className="flex items-center text-2xl font-semibold text-white"
        >
          <FaHome className="mr-2" />
        </Link>
      </div>
      <nav className="hidden gap-6 text-lg font-semibold lg:flex">
        {/* Rest of the menu options */}
        <a href="#projects" className="text-white hover:text-gray-300">
          Projects
        </a>
        <a href="#about" className="text-white hover:text-gray-300">
          About
        </a>
        <a href="#contact" className="text-white hover:text-gray-300">
          Contact
        </a>
        <Link href="/blog" className="text-white hover:text-gray-300">
          Blog
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
