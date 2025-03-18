import React from "react";
import type { IconType } from "react-icons";

interface ProjectCardProps {
  title: string;
  href: string;
  Icon: IconType;
  description: string;
  category?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  Icon,
  href,
  title,
  description,
  category,
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="block">
    <div className="flex h-full flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <div className="mr-3 rounded-full bg-gray-100 p-2 dark:bg-gray-800">
            <Icon className="text-xl text-blue-500" />
          </div>
          <span className="font-medium text-black dark:text-white">
            {title}
          </span>
        </div>
        {category && (
          <span className="rounded-full bg-blue-100 px-2 py-2 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {category}
          </span>
        )}
      </div>
      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </div>
    </div>
  </a>
);

export default ProjectCard;
