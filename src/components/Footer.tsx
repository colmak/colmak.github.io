import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-center border-t border-grey p-4 pin-b">
      <p>
        © {year} Roland Van Duine. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;