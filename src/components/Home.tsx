import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Home = ({ darkMode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Web Developer | Designer | Learner';
  const [typingIndex, setTypingIndex] = useState(0);
  const [nameVisible, setNameVisible] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => setNameVisible(true), 500);
  }, []);

  useEffect(() => {
    if (typingIndex < fullText.length) {
      const timeoutId = setTimeout(() => {
        setTypedText(fullText.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [typingIndex, fullText]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="container mx-auto text-center z-10">
        <div className="transition-all duration-1000">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Hi, I'm{' '}
            <span className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000 ${
              nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Jeeva Anandan
            </span>
          </h1>
          
          <h2 className="inline-block text-xl sm:text-2xl md:text-3xl font-medium mb-8 h-8 border-r-4 border-blue-400 pr-2 animate-cursor text-white">
            {typedText}
          </h2>
          
          <p className={`max-w-lg mx-auto text-base md:text-lg text-gray-200 mb-12 transition-all duration-1000 delay-500 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            I craft beautiful, user-friendly websites with clean code and modern design principles.
          </p>
          
          <button 
            onClick={scrollToAbout} 
            className={`px-6 py-3 bg-blue-600 text-white rounded-full font-medium transition-all hover:bg-blue-700 hover:shadow-lg flex items-center mx-auto transition-all duration-1000 delay-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Learn More
            <ArrowDown className="ml-2" size={16} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <button
          onClick={scrollToAbout}
          className="p-2 rounded-full bg-white bg-opacity-20 text-white"
          aria-label="Scroll down"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Home;