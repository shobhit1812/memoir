import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <hr className="border-t border-white" />
      <footer className="p-5 backdrop-blur-lg bg-[#09090b] text-[#fafafa] z-50">
        <div className="flex flex-col md:flex-row justify-between items-start mx-auto max-w-screen-xl px-6 md:px-16 lg:px-36 space-y-6 md:space-y-0">
          {/* About Us Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-slate-400">
              About Us
            </h3>
            <p className="text-sm">
              {`Memoir, a platform designed for those who love to read, write, and explore ideas. Whether you're diving into thought-provoking stories or expressing your own through writing, Memoir offers a space where curiosity meets creativity.`}
            </p>
          </div>

          {/* Follow Us Section */}
          <div className="flex-1 md:ml-16">
            <h3 className="text-lg font-semibold mb-2 text-slate-400">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Shobhit1812"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-transform hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <FiGithub />
              </a>
              <a
                href="https://x.com/shobhitnautiya_"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-transform hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://instagram.com/imshobhitnautiyal"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-transform hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-slate-400">
              Contact Us
            </h3>
            <p className="text-sm">
              Email: contact@memoir.com <br />
              Phone: +123 456 7890
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
