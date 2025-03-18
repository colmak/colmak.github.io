import React from "react";
import type { IconType } from "react-icons";

interface UnderlinedTextProps {
  children: React.ReactNode;
  href: string;
  Icon: IconType;
}

const UnderlinedTextWithIcon = ({
  children,
  href,
  Icon,
}: UnderlinedTextProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="duration-600 flex cursor-pointer text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
  >
    <Icon className="mr-4 text-2xl text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white" />
    {children}
  </a>
);
export default UnderlinedTextWithIcon;
