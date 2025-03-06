import React from 'react';
import { IconType } from 'react-icons';

interface ProjectCardProps {
  title: string;
  href: string;
  Icon: IconType;
  description: string;
  category?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ Icon, href, title, description, category }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="block">
    <div className="flex flex-col gap-2 h-full border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md bg-white dark:bg-gray-900 rounded-lg transition-all duration-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-3">
            <Icon className="text-xl text-blue-500" />
          </div>
          <span className="font-medium text-black dark:text-white">{title}</span>
        </div>
        {category && (
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            {category}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {description}
      </div>
    </div>
  </a>
);

export default ProjectCard;