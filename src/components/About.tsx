import { useEffect, useRef } from 'react';
import { Code, Palette, Globe, ZapIcon } from 'lucide-react';
import SectionTitle from './SectionTitle';
import photo from '../prot.jpg';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "HTML/CSS", level: 90, icon: <Code size={20} /> },
    { name: "JavaScript", level: 85, icon: <Code size={20} /> },
    { name: "React", level: 80, icon: <Code size={20} /> },
    { name: "UI Design", level: 75, icon: <Palette size={20} /> },
    { name: "Responsive Design", level: 85, icon: <Globe size={20} /> },
    { name: "Performance Optimization", level: 70, icon: <ZapIcon size={20} /> },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 bg-white text-gray-900 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white"
    >
      <div className="container mx-auto">
        <SectionTitle>About Me</SectionTitle>

        {/* Main layout: image and intro side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center animate-on-scroll opacity-0 transition-all duration-700">
          
          {/* Profile Image with glow & background ring */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-1 shadow-2xl">
              <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-contain rounded-full bg-white p-1"
              />
            </div>
          </div>

          {/* Intro Text */}
          <div className="text-left">
            <h3 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">Who Am I?</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              👋 I'm a <span className="text-gray-900 dark:text-white font-semibold">Full Stack Developer</span> who builds fast, beautiful, and user-friendly websites using modern technologies like <span className="text-blue-600 dark:text-blue-400 font-medium">React</span>, <span className="text-yellow-600 dark:text-yellow-300 font-medium">JavaScript</span>, and more.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              💡 I love solving problems through code and turning design into delightful user experiences. Every day, I strive to learn more and become a better developer.
            </p>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              🚀 Let’s build something amazing together!
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">My Skills</h3>
          {skills.map((skill, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="mr-2 text-blue-600 dark:text-blue-400">{skill.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${skill.level}%`,
                    transitionDelay: `${index * 150 + 300}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
