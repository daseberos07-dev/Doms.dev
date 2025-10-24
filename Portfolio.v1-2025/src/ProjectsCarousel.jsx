import React, { useState } from 'react';
import './Project_section.css';

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(3);

  const projects = [
    {
      id: 1,
      title: 'Employee Management System',
      shortDesc: 'Streamlined workforce management platform',
      fullDesc: 'A comprehensive Employee Management System built with React and Node.js. Features include employee database management, attendance tracking, payroll processing, and real-time reporting. Includes role-based access control and automated notifications.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Focus Quest – Productivity RPG',
      shortDesc: 'Gamified productivity and task management',
      fullDesc: 'Turn your productivity into an adventure! Focus Quest is a gamified task management app that transforms your to-do list into an RPG experience. Complete tasks to level up your character, earn rewards, and unlock achievements. Built with React, featuring smooth animations and persistent data storage.',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'Banana Leaf Disease Detector',
      shortDesc: 'AI-powered agricultural disease detection',
      fullDesc: 'An intelligent machine learning model trained to detect diseases in banana plants using image recognition. Farmers can upload leaf images to receive instant diagnostic results with treatment recommendations. Built with TensorFlow, React frontend, and Firebase backend.',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&h=400&fit=crop',
    },
    {
      id: 4,
      title: 'E-Commerce Platform',
      shortDesc: 'Full-featured online shopping solution',
      fullDesc: 'A complete e-commerce platform with product catalog, shopping cart, payment integration, and order tracking. Features include admin dashboard for inventory management, user authentication, and email notifications. Built with React, Express, and MongoDB.',
      image: 'https://images.unsplash.com/photo-1563062407-98eeb64c6a62?w=600&h=400&fit=crop',
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      shortDesc: 'Real-time weather forecasting application',
      fullDesc: 'A beautiful weather dashboard that provides real-time weather data, hourly forecasts, and 7-day predictions. Features include location-based weather, weather alerts, and interactive maps. Powered by OpenWeather API and built with React and Tailwind CSS.',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop',
    },
  ];

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);

  const handlePrev = () => {
    setSelectedProject(null); // Close modal if open
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setSelectedProject(null); // Close modal if open
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const handleCardClick = (e, project) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  const visibleProjects = projects.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <>
      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2>Projects</h2>
            <p>Explore our latest work and innovations</p>
          </div>

          <div className="carousel-wrapper">
            <div className="projects-grid">
              {visibleProjects.map((project, idx) => (
                <div
                  key={`${currentIndex}-${project.id}`}
                  className="project-card"
                  onClick={(e) => handleCardClick(e, project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(e, project);
                    }
                  }}
                  style={{
                    animationDelay: `${idx * 0.1}s`
                  }}
                >
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <div className="project-image-overlay"></div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.shortDesc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button 
                className="nav-button" 
                onClick={handlePrev} 
                aria-label="Previous projects"
                type="button"
              >
                ❮
              </button>
              <div className="dots-container">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedProject(null);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to project group ${idx + 1}`}
                    type="button"
                  />
                ))}
              </div>
              <button 
                className="nav-button" 
                onClick={handleNext} 
                aria-label="Next projects"
                type="button"
              >
                ❯
              </button>
            </div>

            <div className="carousel-indicator">
              Showing {currentIndex + 1} of {maxIndex + 1}
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-header">
              <h3 id="modal-title">{selectedProject.title}</h3>
              <button
                className="close-button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                type="button"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="modal-image"
              />
              <p className="modal-description">{selectedProject.fullDesc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsCarousel;