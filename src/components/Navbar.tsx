import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode, scrollActive }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const currentPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollActive 
          ? 'bg-white bg-opacity-80 shadow-md backdrop-blur-sm dark:bg-gray-800 dark:bg-opacity-80' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <span className="text-blue-600 dark:text-blue-400">J</span>
            <span>A</span>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`capitalize py-2 relative ${
                      activeSection === item 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item}
                    {activeSection === item && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded transform scale-x-100 transition-transform duration-300"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 text-gray-700 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 ml-2 rounded-md bg-gray-100 text-gray-700 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute left-0 right-0 px-4 pt-2 pb-4 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out ${
            mobileMenuOpen 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform -translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <ul className="flex flex-col space-y-4">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left py-2 capitalize ${
                    activeSection === item 
                      ? 'text-blue-600 dark:text-blue-400 font-medium' 
                      : 'hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;