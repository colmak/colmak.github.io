import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 w-full bg-white p-2 text-center dark:bg-black">
      <div className="flex justify-center space-x-4 text-gray-500 dark:text-gray-300">
        <a
          href="https://github.com/colmak"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/rolandvanduine"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white"
        >
          LinkedIn
        </a>
        <a
          href="https://x.com/rolandvan236"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white"
        >
          @rolandvan236
        </a>
        <a
          href="https://youtube.com/@yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white"
        >
          YouTube
        </a>
      </div>
    </footer>
  );
};

export default Footer;
