import React from 'react';

interface UnderlinedTextProps {
  children: React.ReactNode;
  href: string;
}

const UnderlinedText = ({ children, href }: UnderlinedTextProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-black border-b-2 border-gray-200 hover:border-black transition-colors duration-600 cursor-pointer">
    {children}
  </a>
);

export default UnderlinedText;