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
    {
      title: "Project 3",
      imageSrc: "/images/project3.png", // Replace with the path to your image
      description: "Description of Project 3",
    },
    // Add more projects as needed
  ];

  return (
    <section className="py-8 bg-ebony-clay-950">
      <div className="flex justify-center">
        {/* <div className="w-1/8"></div> Left spacer */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col items-center mb-4">
              <div className="w-max h-max">
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  className=""
                  width={400}
                  height={200}
                />
              </div>
              <h3 className="text-lg font-semibold mt-6 text-white">{project.title}</h3>
              <p className="text-white mb-6">{project.description}</p>
            </div>
          ))}
        </div>
        {/* <div className="w-1/8"></div> Right spacer */}
      </div>

      <style jsx>{`
        @media (max-width: 852px) {
          .w-max {
            max-width: 80%;
          }
          .h-max {
            max-height: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
