import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-gray-400 py-12 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            {`Memoir, a platform designed for those who love to read, write, and
            explore ideas. Whether you're diving into thought-provoking stories
            or expressing your own through writing, Memoir offers a space where
            curiosity meets creativity.`}
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Shobhit1812"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <FiGithub />
            </a>
            <a
              href="https://x.com/shobhitnautiya_"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://instagram.com/imshobhitnautiyal"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>New Delhi, India</p>
          <p>Delhi 10001</p>
          <p>Email: info@shobhit.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
