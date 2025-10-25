import React, { useState, useEffect } from 'react';
import '../App.css';
import projects from '../data/projectsContent';
import '../styles/Project_section.css';


const ProjectsCarousel = ({ setModalOpen, modalOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);

  const handlePrev = () => {
    setSelectedProject(null);
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setSelectedProject(null);
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const handleCardClick = (e, project) => {
    e.stopPropagation();
    setSelectedProject(project);
    setModalOpen(true);
    console.log("Modal opened from ProjectsCarousel");
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
    console.log("Modal closed from ProjectsCarousel");
  };

  // 🧠 Close modal if parent closes it
  useEffect(() => {
    if (!modalOpen && selectedProject) {
      setSelectedProject(null);
    }
  }, [modalOpen]);

  const visibleProjects = projects.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <>
      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2>Projects</h2>
           <p>Explore what I’ve been building lately.</p>
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
                    if (e.key === 'Enter' || e.key === ' ') handleCardClick(e, project);
                  }}
                  style={{ animationDelay: `${idx * 0.1}s` }}
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
              <button className="nav-button" onClick={handlePrev} aria-label="Previous projects" type="button">
                ❮
              </button>

              <div className="dots-container">
                <div className="dots-holder">
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
              </div>

              <button className="nav-button" onClick={handleNext} aria-label="Next projects" type="button">
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
        <div className="modal-overlay" onClick={closeModal} role="presentation">
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-header">
              <h3 id="modal-title">{selectedProject.title}</h3>
              <button className="close-button" onClick={closeModal} aria-label="Close modal" type="button">
                ✕
              </button>
            </div>

            <div className="modal-body">
              <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
              <div className="modal-content-holder">
                <p className="modal-description">{selectedProject.fullDesc}</p>

          <div className="links-container">
              {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="c"
                      >
                        Live Demo
                      </a>
                    )}

                    {/* Read more link */}
                    <a href={selectedProject.readMore || "#"} className="read-more">
                      Read more
                    </a>
                </div>
             </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsCarousel;
