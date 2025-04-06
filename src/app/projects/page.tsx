import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProjectsClient = dynamic(() => import("./projects-client"), {
  ssr: true,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Projects | Roland Van Duine",
  description:
    "Explore Roland Van Duine's portfolio of projects in web development, AI, IoT, and more.",
  openGraph: {
    title: "Roland Van Duine's Projects",
    description:
      "A showcase of my work across various technologies and domains",
    type: "website",
    images: [
      {
        url: "/images/projects-og.jpg",
        width: 1200,
        height: 630,
        alt: "Roland Van Duine's Projects",
      },
    ],
  },
};

// Category to color mapping for consistent visual representation
const categoryColorMap: Record<string, string> = {
  "Web Development": "blue",
  AI: "purple",
  IoT: "green",
  Security: "red",
  Game: "amber",
  Mobile: "emerald",
  Data: "cyan",
  Fitness: "green",
};

export default function ProjectsPage() {
  const projects = [
    {
      icon: "FaBookOpen",
      href: "/wordle",
      title: "Wordle 2",
      description: "Next.js, Tailwind.css",
      category: "Web Development",
      featured: true,
    },
    {
      icon: "FaClock",
      href: "/timely-tome",
      title: "Timely Tome",
      description: "Raspberry Pi, eInk, Python, Next.js",
      category: "IoT",
      featured: true,
    },
    {
      icon: "FaRunning",
      href: "/running-log",
      title: "Running Log",
      description: "Next.js, Strava API, React",
      category: "Fitness",
      featured: true,
    },
    {
      icon: "FaClock",
      href: "/doomsdayalgo",
      title: "Doomsday Algorithm",
      description: "Next.js, Tailwind.css",
      category: "Web Development",
    },
    {
      icon: "FaBug",
      href: "https://github.com/Cyber-Tutor/Cyber-Tutor-Frontend",
      title: "Cyber Tutor",
      description: "Python, Langchain, Next.js, Firebase...",
      category: "AI",
      featured: true,
    },
    {
      icon: "FaLock",
      href: "https://github.com/colmak/Image-Encryption",
      title: "Image Encryptor",
      description: "Python, Numpy, PyQt5, Pillow",
      category: "Security",
    },
    {
      icon: "FaCalculator",
      href: "/what-digit",
      title: "What Digit",
      description: "Next.js, Tensorflow (tfjs)",
      category: "AI",
    },
    {
      icon: "FaBook",
      href: "https://www.yusufmzaidi.com/",
      title: "Yusuf's Portfolio",
      description: "Next.js, Tailwind.css, Framer Motion",
      category: "Web Development",
    },
    {
      icon: "FaChess",
      href: "/chess",
      title: "Go Chess Go",
      description: "Golang, Gin",
      category: "Game",
    },
    {
      icon: "FaRobot",
      href: "https://github.com/colmak/SerenityNow",
      title: "Serenity Now",
      description: "Python, Gradio, GPT-3.5",
      category: "AI",
    },
    {
      icon: "FaQuestion",
      href: "https://github.com/BigRedDoge/GreenSwitch",
      title: "Green Switch",
      description: "React Native, Flask, SQLite",
      category: "Mobile",
    },
    {
      icon: "FaCloudMoonRain",
      href: "https://github.com/colmak/Weathered-Weather-App",
      title: "Weathered",
      description: "Python, Django, SQLite",
      category: "Web Development",
    },
    {
      icon: "FaSpider",
      href: "https://github.com/colmak/wikiCountryScraper/",
      title: "Country Scraper",
      description: "Python, BS4, Requests",
      category: "Data",
    },
    {
      icon: "FaMusic",
      href: "https://github.com/colmak/infrared-music-player",
      title: "IR Music Player",
      description: "C, Arduino",
      category: "IoT",
    },
  ];

  const projectsWithIds = projects.map((project, index) => ({
    ...project,
    id: index + 1,
    color: categoryColorMap[project.category] || "slate",
  }));

  return (
    <Suspense fallback={null}>
      <ProjectsClient projects={projectsWithIds} />
    </Suspense>
  );
}
