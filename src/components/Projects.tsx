import React from "react";
import Image from "next/image";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "SerenityNow",
      imageSrc: "/images/project1.png", // Replace with the path to your image
      description: "SerenityNow is an empathetic chatbot project supporting anxious individuals. Powered by OpenAI's GPT-3.5-turbo model.",
      link: "https://github.com/colmak/SerenityNow" // Replace with the link to your project
    },
    {
      title: "CS Club Website",
      imageSrc: "/images/project2.png", // Replace with the path to your image
      description: "Website for the CCSU CS Club",
      link: "https://github.com/CCSU-Computer-Science-Club/ccsu_cs_club" // Replace with the link to your project
    },
    {
      title: "Portfolio",
      imageSrc: "/images/project3.png", // Replace with the path to your image
      description: "A showcase of innovative projects and experiences crafted by me",
      link: "https://github.com/colmak/colmak.github.io" // Replace with the link to your project
    },
    // Add more projects as needed
  ];

  return (
    <section className="py-8 bg-ebony-clay-950">
      <div className="flex justify-center">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col items-center mb-4 project-card"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <div className="w-max h-max mx-auto">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    className=""
                    width={400}
                    height={200}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mt-6 text-white">
                    {project.title}
                  </h3>
                  <p className="text-white mb-6 max-w-xs mx-auto">{project.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .w-max {
          max-width: 80%;
        }
        
        .h-max {
          max-height: 200px;
        }

        .project-card {
          transition: transform 0.3s ease;
        }

        .project-card:hover {
          transform: scale(1.05);
        }

        .max-w-xs {
          max-width: 20rem; /* Adjust the value as needed */
        }
      `}</style>
    </section>
  );
};

export default Projects;
