import { useState } from 'react';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button className="text-black dark:text-white" onClick={toggleTheme}>
      {isDarkMode ? <IoMdSunny /> : <IoMdMoon />}
    </button>
  );
}

export default DarkModeButton;