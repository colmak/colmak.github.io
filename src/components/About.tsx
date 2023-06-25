import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  const photoSrc = "/images/rolandflowersquare.jpg"; // Replace with the path to your photo
  const title = "About Me";
  const paragraph =
    "My primary aspiration is to unleash a profound positive impact through my work. I am determined to create transformative software solutions that boldly tackle real-world challenges and elevate the lives of individuals";

  return (
    <section className="py-8 bg-ebony-clay-950">
      <div className="container flex items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <Image src={photoSrc} alt="About Me" width={400} height={400} />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl pb-4 font-extrabold tracking-tight text-white sm:text-5xl">
              {title}
            </h2>
            <p className="text-lg text-white max-w-md">{paragraph}</p> {/* Added max-w-md class */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
