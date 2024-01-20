import React from 'react';
import { IconType } from 'react-icons';

interface ProjectCardProps {
  title: string;
  href: string;
  Icon: IconType;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ Icon, href, title, description }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      <div className="flex flex-col gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200 p-2">
        <div className="flex-grow flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-600 cursor-pointer">
          <Icon className="text-2xl mr-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white" />
          <span className="hover:text-black dark:hover:text-white">{title}</span>
        </div>
        <div className="text-[.93rem] text-gray-500 dark:text-gray-400">
          {description}
        </div>
      </div>
    </a>
  );

export default ProjectCard;