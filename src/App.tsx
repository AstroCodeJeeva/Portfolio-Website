import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);

  // Check if user prefers dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Handle scroll events for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} scrollActive={scrollActive} />
        
        <main>
          <Home darkMode={darkMode} />
          <About />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default App;