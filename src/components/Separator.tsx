// Separator.tsx
import React from "react";

type SeparatorProps = {
  text: string;
};

const Separator: React.FC<SeparatorProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center my-12">
      <div className="w-1/5 h-px bg-gray-600 mr-4"></div>
      <h3 className="text-gray-600 text-lg font-semibold">{text}</h3>
      <div className="w-1/5 h-px bg-gray-600 ml-4"></div>
    </div>
  );
};

export default Separator;
