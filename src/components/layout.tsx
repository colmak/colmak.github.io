import { useState, useEffect, ReactNode } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Link from "next/link";
import UnderlinedText from "~/components/UnderlinedText";
import DarkModeButton from "~/components/DarkModeButton";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
            <header className="p-4 text-black dark:text-white">
                <div className="container flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-xl font-semibold text-black dark:text-white"
                    >
                        <a className="text-xl font-semibold text-black dark:text-white">RVD</a>
                    </Link>
                    <div className="flex gap-4">
                        <Link href="/projects"><a>Projects</a></Link>
                    </div>
                </div>
            </header>
            <main className="flex-grow">{children}</main>
        </div>
    );
};

export default Layout;