import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">
              <span className="text-blue-400">Port</span>folio
            </h2>
            <p className="text-gray-400 mt-2 text-sm max-w-md">
              Crafting beautiful, responsive websites and applications with a focus on user experience and performance.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/AstroCodeJeeva" 
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors duration-300"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/astro21/" 
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>

            
            <a 
              href="https://www.instagram.com/_it.s_jeeva?igsh=MThuYjhobjJ1czdvYw==" 
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>&copy; {currentYear} Your Name. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;