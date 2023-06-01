interface MenuProps {
    isMenuOpen: boolean;
    closeMenu: () => void;
    handleItemClick: () => void;
  }
  
  const Menu: React.FC<MenuProps> = ({
    isMenuOpen,
    closeMenu,
    handleItemClick,
  }) => {
    return (
      <>
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
        >
          <a
            href="#about"
            className=" menu-option bg-ebony-clay-800 text-lg font-semibold text-white hover:bg-ebony-clay-800"
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
      </>
    );
  };
  
  export default Menu;
  