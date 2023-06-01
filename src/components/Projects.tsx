// Projects.tsx
import React from "react";
import Image from "next/image";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Project 1",
      imageSrc: "/images/project1.png", // Replace with the path to your image
      description: "Description of Project 1",
    },
    {
      title: "Project 2",
      imageSrc: "/images/project2.png", // Replace with the path to your image
      description: "Description of Project 2",
    },
    // Add more projects as needed
  ];

  return (
    <section className="container mx-auto py-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-64 h-64 relative mb-4">
              <Image
                src={project.imageSrc}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
