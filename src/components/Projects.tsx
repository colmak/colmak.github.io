import React from "react";
import Image from "next/image";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-ebony-clay-950 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="bg-white p-4 rounded shadow">
            <div className="mb-4">
              <Image
                src="/images/project1.png" // Replace with the path to your project image
                alt="Project 1"
                width={300}
                height={200}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Project 1</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu
              ante vel nulla laoreet vehicula.
            </p>
          </div>

          {/* Project Card 2 */}
          <div className="bg-white p-4 rounded shadow">
            <div className="mb-4">
              <Image
                src="/images/project2.png" // Replace with the path to your project image
                alt="Project 2"
                width={300}
                height={200}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Project 2</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu
              ante vel nulla laoreet vehicula.
            </p>
          </div>

          {/* Project Card 3 */}
          <div className="bg-white p-4 rounded shadow">
            <div className="mb-4">
              <Image
                src="/images/project3.png" // Replace with the path to your project image
                alt="Project 3"
                width={300}
                height={200}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Project 3</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu
              ante vel nulla laoreet vehicula.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
