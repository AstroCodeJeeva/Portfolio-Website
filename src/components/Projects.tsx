import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import SectionTitle from './SectionTitle';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  live: string;
  github: string;
  tags: string[];
}

const Projects = () => {
  const [activeFilter, ] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      id: 2,
      title: "Task Manager App",
      description: "A productivity app with task categorization, reminders, and progress tracking features.",
      image: "https://images.pexels.com/photos/5717479/pexels-photo-5717479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      live: "https://actodo-project-seven.vercel.app/",
      github: "https://github.com/AstroCodeJeeva/Actodo-Project.git",
      tags: ["react", "frontend", "fullstack"]
    },
    {
      id: 3,
      title: "Udemy Clone",
      description: "Modern website for a creative agency featuring animated sections and contact form.",
      image: "https://yt3.googleusercontent.com/Y_G09q2it3FZMrbbxwLjgMjSanR1mZAsXnEE6g6ZaBXlq2dLIRsKqSrGTCMuiyvvVavu-xFvPEc=s900-c-k-c0x00ffffff-no-rj",
      live: "https://astrocodejeeva.github.io/Udemy-clone/",
      github: "https://github.com/AstroCodeJeeva/Udemy-clone",
      tags: ["html", "css", "frontend"]
    },
    {
      id: 4,
      title: "GreenDen",
      description: "Real-time weather application with forecast data, location search, and interactive maps.",
      image: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      live: "https://astrocodejeeva.github.io/greenden-tailwind/",
      github: "https://github.com/AstroCodeJeeva/greenden-tailwind",
      tags: ["javascript", "tailwind", "frontend"]
    },
  ];

  // Filter projects
  useEffect(() => {
    if (activeFilter === 'all') {
      setVisibleProjects(projects);
    } else {
      const filtered = projects.filter(project =>
        project.tags.includes(activeFilter)
      );
      setVisibleProjects(filtered);
    }
  }, [activeFilter]);

  // Init
  useEffect(() => {
    setVisibleProjects(projects);
  }, []);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [visibleProjects]);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 px-4 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <SectionTitle>My Projects</SectionTitle>

        {/* Filter buttons (optional)
        <div className="flex flex-wrap justify-center mt-8 mb-12 animate-on-scroll opacity-0">
          {['all', 'react', 'frontend', 'fullstack', 'design', 'api'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`m-2 px-4 py-2 rounded-full capitalize transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all animate-on-scroll opacity-0"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex space-x-2 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-2 py-1 bg-blue-600 bg-opacity-80 text-white text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
                      aria-label="View GitHub repository"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
                      aria-label="View live project"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
