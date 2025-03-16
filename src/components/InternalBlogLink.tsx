import Link from "next/link";
import React from "react";

interface InternalBlogLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * InternalBlogLink component - A wrapper around Next.js Link that ensures navigation
 * happens within the same tab
 */
const InternalBlogLink: React.FC<InternalBlogLinkProps> = ({
  href,
  className = "",
  children,
}) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default InternalBlogLink;
