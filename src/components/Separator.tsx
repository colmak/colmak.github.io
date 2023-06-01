// Separator.tsx
import React from "react";

type SeparatorProps = {
  text: string;
};

const Separator: React.FC<SeparatorProps> = ({ text }) => {
  return (
    <div className="flex bg-ebony-clay-200 items-center justify-center">
      <div className="w-1/5 h-px bg-ebony-clay-950 mr-4"></div>
      <h2 className="text-3xl font-bold text-ebony-clay-950 m-8">{text}</h2>
      <div className="w-1/5 h-px bg-ebony-clay-950 ml-4"></div>
    </div>
  );
};

export default Separator;
