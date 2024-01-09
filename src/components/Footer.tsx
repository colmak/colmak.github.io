import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-center border-t border-grey p-4 pin-b">
      <p>
        &copy; {year} Your Name. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;