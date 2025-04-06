"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import {
  FaFilter,
  FaSearch,
  FaStar,
  FaThLarge,
  FaList,
  FaArrowRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

// Load icons only when needed to reduce initial JS size
const IconComponents = {
  FaBookOpen: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaBookOpen })),
  ),
  FaClock: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaClock })),
  ),
  FaBug: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaBug })),
  ),
  FaLock: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaLock })),
  ),
  FaCalculator: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaCalculator })),
  ),
  FaBook: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaBook })),
  ),
  FaChess: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaChess })),
  ),
  FaRobot: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaRobot })),
  ),
  FaQuestion: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaQuestion })),
  ),
  FaCloudMoonRain: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaCloudMoonRain })),
  ),
  FaSpider: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaSpider })),
  ),
  FaMusic: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaMusic })),
  ),
  FaRunning: lazy(() =>
    import("react-icons/fa").then((mod) => ({ default: mod.FaRunning })),
  ),
};

const IconFallback = () => (
  <div className="h-5 w-5 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
);

const ProjectCard = dynamic(() => import("~/components/ProjectCard"), {
  ssr: true,
  loading: () => (
    <div className="h-[120px] w-full animate-pulse rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800/30"></div>
  ),
});

const SkeletonLoader = dynamic(() => import("~/components/SkeletonLoader"), {
  ssr: false,
});

interface Project {
  id: number;
  icon: string;
  href: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
  color?: string;
}

interface ProjectsClientProps {
  projects: Project[];
}

export function Head() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
    </>
  );
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleBeforeUnload = () => {
        localStorage.setItem("projectLayoutMode", layoutMode);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [layoutMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLayout = localStorage.getItem("projectLayoutMode") as
        | "grid"
        | "list"
        | null;
      if (savedLayout) {
        setLayoutMode(savedLayout);
      }
    }
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(projects.map((project) => project.category))),
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (searchTerm === "" && selectedCategory === "All") {
      return projects;
    }

    return projects.filter((project) => {
      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      return (
        selectedCategory === "All" || project.category === selectedCategory
      );
    });
  }, [projects, searchTerm, selectedCategory]);

  const featuredProjects = useMemo(() => {
    return filteredProjects.filter((project) => project.featured);
  }, [filteredProjects]);

  const regularProjects = useMemo(() => {
    return filteredProjects.filter((project) => !project.featured);
  }, [filteredProjects]);

  const getIconComponent = useCallback((iconName: string) => {
    const Icon =
      IconComponents[iconName as keyof typeof IconComponents] ||
      IconComponents.FaQuestion;
    return (
      <Suspense fallback={<IconFallback />}>
        <Icon />
      </Suspense>
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("All");
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const timeoutId = setTimeout(() => {
        setSearchTerm(value);
      }, 100);
      return () => clearTimeout(timeoutId);
    },
    [],
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
      <Header />
      <div className="container mx-auto flex items-center justify-center">
        <main className="container flex max-w-screen-md flex-col items-start justify-start gap-4 px-4 py-12 sm:px-8">
          <div className="mb-8 w-full">
            <div className="relative mb-6 overflow-hidden">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl dark:bg-blue-800/20"></div>
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-green-500/10 blur-2xl dark:bg-green-800/20"></div>
              <h1 className="relative w-full pb-3 text-center text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
                My Projects
              </h1>
              <p className="relative w-full text-center text-gray-600 dark:text-gray-300">
                A collection of personal and collaborative projects across
                various technologies
              </p>
            </div>

            <div className="mb-8 flex w-full flex-col gap-4 rounded-xl border border-gray-200/70 bg-gray-50/80 p-4 backdrop-blur-sm dark:border-gray-800/70 dark:bg-gray-900/30 sm:flex-row">
              <div className="relative flex-grow">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full rounded-lg border border-gray-200 bg-white/80 px-10 py-2.5 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800/80"
                  defaultValue={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="relative min-w-[140px]">
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white/80 px-10 py-2.5 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800/80"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex min-w-[90px] items-center space-x-2">
                <button
                  className={`rounded-md p-2.5 ${layoutMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}
                  onClick={() => setLayoutMode("grid")}
                  aria-label="Grid view"
                >
                  <FaThLarge />
                </button>
                <button
                  className={`rounded-md p-2.5 ${layoutMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}
                  onClick={() => setLayoutMode("list")}
                  aria-label="List view"
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>

          {!isLoaded ? (
            <div className="mb-8 flex h-[500px] w-full items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            featuredProjects.length > 0 && (
              <div className="mb-8 w-full">
                <div className="mb-5 flex items-center px-1">
                  <FaStar className="mr-2 text-yellow-500" />
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Featured Projects
                  </h2>
                </div>
                <div className="grid w-full grid-cols-1 gap-6">
                  {featuredProjects.map((project) => (
                    <div key={project.id} className="w-full">
                      <ProjectCard
                        Icon={getIconComponent(project.icon)}
                        href={project.href}
                        title={project.title}
                        description={project.description}
                        category={project.category}
                        color={project.color}
                        layout={layoutMode}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {!isLoaded ? null : filteredProjects.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center rounded-xl border border-gray-200/50 bg-gray-50/70 p-12 text-center text-gray-500 dark:border-gray-800/50 dark:bg-gray-900/30 dark:text-gray-400">
              <FaSearch className="mb-3 text-4xl text-gray-400 dark:text-gray-600" />
              <p className="text-lg">
                No projects found matching your criteria.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              >
                <span>Reset Filters</span>
                <FaArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="w-full">
              {regularProjects.length > 0 && (
                <>
                  {featuredProjects.length > 0 && (
                    <div className="my-5 flex items-center px-1">
                      <h2 className="text-xl font-semibold text-black dark:text-white">
                        All Projects
                      </h2>
                    </div>
                  )}
                  <div
                    className={`grid w-full ${layoutMode === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-4`}
                  >
                    {regularProjects.map((project) => (
                      <div key={project.id} className="w-full">
                        <ProjectCard
                          Icon={getIconComponent(project.icon)}
                          href={project.href}
                          title={project.title}
                          description={project.description}
                          category={project.category}
                          color={project.color}
                          layout={layoutMode}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <Footer />
        </main>
      </div>
    </div>
  );
}
