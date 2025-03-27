import React, { memo } from "react";
import type { IconType } from "react-icons";

interface ProjectCardProps {
  title: string;
  href: string;
  Icon: React.ReactNode;
  description: string;
  category?: string;
  color?: string;
  layout?: "grid" | "list";
}

interface ColorClass {
  bg: string;
  text: string;
  hover: string;
  darkBg: string;
  darkText: string;
  gradient: string;
  darkGradient: string;
}

const colorClassMap: Record<string, ColorClass> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    hover: "hover:border-blue-400",
    darkBg: "dark:bg-blue-950/40",
    darkText: "dark:text-blue-400",
    gradient: "from-blue-500/10 to-blue-600/5",
    darkGradient: "dark:from-blue-800/20 dark:to-blue-900/10",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    hover: "hover:border-green-400",
    darkBg: "dark:bg-green-950/40",
    darkText: "dark:text-green-400",
    gradient: "from-green-500/10 to-green-600/5",
    darkGradient: "dark:from-green-800/20 dark:to-green-900/10",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
    hover: "hover:border-red-400",
    darkBg: "dark:bg-red-950/40",
    darkText: "dark:text-red-400",
    gradient: "from-red-500/10 to-red-600/5",
    darkGradient: "dark:from-red-800/20 dark:to-red-900/10",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    hover: "hover:border-purple-400",
    darkBg: "dark:bg-purple-950/40",
    darkText: "dark:text-purple-400",
    gradient: "from-purple-500/10 to-purple-600/5",
    darkGradient: "dark:from-purple-800/20 dark:to-purple-900/10",
  },
  // ...existing color classes...
  slate: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    hover: "hover:border-slate-400",
    darkBg: "dark:bg-slate-800/40",
    darkText: "dark:text-slate-400",
    gradient: "from-slate-500/10 to-slate-600/5",
    darkGradient: "dark:from-slate-700/20 dark:to-slate-800/10",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    hover: "hover:border-amber-400",
    darkBg: "dark:bg-amber-950/40",
    darkText: "dark:text-amber-400",
    gradient: "from-amber-500/10 to-amber-600/5",
    darkGradient: "dark:from-amber-800/20 dark:to-amber-900/10",
  },
  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    hover: "hover:border-cyan-400",
    darkBg: "dark:bg-cyan-950/40",
    darkText: "dark:text-cyan-400",
    gradient: "from-cyan-500/10 to-cyan-600/5",
    darkGradient: "dark:from-cyan-800/20 dark:to-cyan-900/10",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    hover: "hover:border-emerald-400",
    darkBg: "dark:bg-emerald-950/40",
    darkText: "dark:text-emerald-400",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    darkGradient: "dark:from-emerald-800/20 dark:to-emerald-900/10",
  },
};

const defaultColorClass = colorClassMap.blue;

const ProjectCard = memo(function ProjectCard({
  Icon,
  href,
  title,
  description,
  category,
  color = "blue",
  layout = "grid",
}: ProjectCardProps) {
  const colorClasses = colorClassMap[color] || defaultColorClass;
  const isListMode = layout === "list";

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <div
        className={`flex h-full ${isListMode ? "flex-row items-center" : "flex-col"} 
        gap-3 rounded-xl border border-gray-200/70 bg-gradient-to-br ${colorClasses.gradient} ${colorClasses.darkGradient} 
        p-5 backdrop-blur-sm transition-colors duration-200 ${colorClasses.hover} 
        hover:shadow-md dark:border-gray-800 dark:hover:border-opacity-70`}
      >
        <div
          className={`flex ${isListMode ? "mr-4 flex-1" : "w-full"} items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg ${colorClasses.bg} ${colorClasses.darkBg} p-2.5`}
            >
              {Icon}
            </div>
            <span className="font-semibold text-gray-800 dark:text-white">
              {title}
            </span>
          </div>
          {category && !isListMode && (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${colorClasses.bg} ${colorClasses.darkBg} 
              ${colorClasses.text} ${colorClasses.darkText}`}
            >
              {category}
            </span>
          )}
        </div>
        <div
          className={`${isListMode ? "flex-1" : "mt-1"} text-sm text-gray-600 dark:text-gray-300`}
        >
          {description}
        </div>
        {category && isListMode && (
          <div className="ml-auto">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${colorClasses.bg} ${colorClasses.darkBg} 
              ${colorClasses.text} ${colorClasses.darkText}`}
            >
              {category}
            </span>
          </div>
        )}
      </div>
    </a>
  );
});

export default ProjectCard;
