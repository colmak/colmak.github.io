import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-grey p-2 pin-b">
      <p>
        &copy; {year} Roland Van Duine. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;