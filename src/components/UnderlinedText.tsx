import React from 'react';

interface UnderlinedTextProps {
  children: React.ReactNode;
  href: string;
}

const UnderlinedText = ({ children, href }: UnderlinedTextProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-500 hover:border-black dark:hover:border-gray-300 transition-colors duration-600 cursor-pointer">
    {children}
  </a>
);

export default UnderlinedText;