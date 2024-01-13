import React from 'react';
import { IconType } from 'react-icons';

interface UnderlinedTextProps {
  children: React.ReactNode;
  href: string;
  Icon: IconType;
}

const UnderlinedTextWithIcon = ({ children, href, Icon }: UnderlinedTextProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-600 cursor-pointer">
    <Icon className="mr-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white" />
    {children}
  </a>
);
export default UnderlinedTextWithIcon;