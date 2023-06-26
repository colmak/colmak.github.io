import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

// Import the necessary styles for the icons
import "@fortawesome/fontawesome-svg-core/styles.css";

// Add the icons to the library
library.add(faEnvelope, faLinkedin, faGithub);

const Contact: React.FC = () => {
  const title = "Contact Me";
  const paragraph =
    "Feel free to reach out to me via email or connect with me on LinkedIn and GitHub.";

  const [emailData, setEmailData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = emailData;
    const mailtoLink = `mailto:roland.van.duine@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(
      name
    )}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(
      message
    )}`;
    window.location.href = mailtoLink;
    setEmailData({ name: "", email: "", message: "" });
  };
  

  return (
    <section className="py-8 bg-ebony-clay-950">
      <div className="container flex items-center justify-center gap-12 px-4 py-16">
        <div className="w-1/2">
          <h2 className="text-3xl pb-4 font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="text-lg text-white">{paragraph}</p>

          <div className="flex mt-8 gap-4">
            <a
              href="mailto:roland.van.duine@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href="https://www.linkedin.com/in/rolandvanduine/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://github.com/colmak"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={emailData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={emailData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={emailData.message}
                onChange={handleInputChange}
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Send Email
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .contact-icon {
          color: white;
          font-size: 2rem;
        }
        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          background-color: #4f46e5;
          color: white;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #4338ca;
        }
      `}</style>
    </section>
  );
};

export default Contact;
