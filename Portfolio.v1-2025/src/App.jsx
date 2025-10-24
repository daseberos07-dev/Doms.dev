import { useEffect, useState } from "react";
import "./App.css";
import "./Hero_section.css";
import "./navbar.css";
import "./footer.css";
import "./About_section.css";
import ProjectsCarousel from './ProjectsCarousel';


function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const aboutCards = [
    {
      title: "Get to Know Me",
   text: "I’m Domince Aseberos, 22 years old, a Computer Science student and aspiring full-stack developer. I’m passionate about creating customized web applications that blend creativity with real-world functionality. I love learning new things, exploring innovative ideas, and turning them into meaningful digital experiences. ",
    },
    {
      title: "How It All Started",
      text: "My journey began with Java as my first programming language, which helped me build logical thinking and problem-solving skills that sparked my interest in software creation.",
    },
    {
      title: "How It Is Now",
      text: "I’ve shifted my focus to full-stack web development, learning how to bring ideas to life through design, interaction, and scalable code that delivers real-world value.",
    },
    {
      title: "What I Know",
      text: "I have experience with HTML, CSS, JavaScript, React, and Node.js — plus basic knowledge of PHP for database work and Python, which I’m exploring for AI and Machine Learning.",
    },
    {
      title: "My Skills",
      text: "I focus on building responsive web applications with clean UI, reusable components, and efficient code architecture.",
    },
    {
      title: "My Goal",
      text: "To become a skilled full-stack developer capable of creating innovative and intelligent digital solutions that make a difference.",
    },
    {
      title: "Quote",
      text: "Code is like art — every line tells a story of logic and creativity.",
    },
  ];

  // modal state for showing full card text
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", text: "" });
  const [modalClosing, setModalClosing] = useState(false);

  const sections = [
    {
      id: 1,
      content: (
        <section className="hero-section">
          <div className="hero-content">
            <div className="name-box">
              <p>
                <strong>Hi! I'm</strong>
              </p>
              <h1>Domince Aseberos</h1>
            </div>

            <h2>
              <span className="roles">
                <span>Full-Stack Web Developer</span>
                <span>UI/UX Builder</span>
                <span>Creative Tech Explorer</span>
              </span>
            </h2>
            <p>
              Computer Science student who loves crafting modern, interactive, and well designed web applications.
            </p>

            <a href="#portfolio" className="btn">
              View My Work
            </a>
          </div>

          <div className="hero-profile">
            <img src="./noBG_prof.png" alt="Profile Image" />
          </div>
        </section>
      ),
      color: "#111",
    },
    {
      id: 2,
      content: (
        <section className="about-section">
          <div className="titles-container">
            {/* Titles grid: clicking a title opens the modal with full text */}
            <div className="about-titles-grid">
              {aboutCards.map((card, i) => (
                <button
                  key={i}
                  type="button"
                  className="title-btn"
                  onClick={() => {
                    setModalContent({ title: card.title, text: card.text });
                    setModalClosing(false);
                    setModalOpen(true);
                  }}
                >
                  {card.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      ),
      color: "#111",
    },
    {
      id: 3,
      content: (
        <section className="projects-section">
          <ProjectsCarousel />
        
        </section>
      ),
      color: "#111",
    },
    {
      id: 4,
      content: (
        <section className="contact-section">
          <h1>Contact</h1>
          <p>Email: domince.dev@example.com</p>
          <p>LinkedIn: @dominceaseberos</p>
        </section>
      ),
      color: "#111",
    },
  ];

  useEffect(() => {
    let startY = 0;

    const handleWheel = (e) => {
      if (scrolling) return;
      setScrolling(true);

      if (e.deltaY > 0 && activeIndex < sections.length - 1) {
        setActiveIndex((i) => i + 1);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        setActiveIndex((i) => i - 1);
      }

      setTimeout(() => setScrolling(false), 800);
    };

    const onTouchStart = (e) => (startY = e.touches[0].clientY);
    const onTouchEnd = (e) => {
      const diff = startY - e.changedTouches[0].clientY;
      if (scrolling) return;
      setScrolling(true);

      if (diff > 50 && activeIndex < sections.length - 1) {
        setActiveIndex((i) => i + 1);
      } else if (diff < -50 && activeIndex > 0) {
        setActiveIndex((i) => i - 1);
      }

      setTimeout(() => setScrolling(false), 800);
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeIndex, scrolling, sections.length]);

  // removed debug logging

  return (
    <>
      {/* 🌟 Responsive Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <h1 className="logo-name">Doms.dev</h1>
          {/* Hamburger Icon (Visible on mobile) */}
          <div
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </div>

          {/* Navigation Links */}
          <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
            {sections.map((sec, i) => (
              <a
                key={sec.id}
                onClick={() => {
                  setActiveIndex(i);
                  setMenuOpen(false);
                }}
                className={i === activeIndex ? "active" : ""}
              >
                {["Home", "About", "Projects", "Contact"][i]}
              </a>
            ))}
          </nav>
        </div>
      </header>
      {/* FOOTER SECTIOn */}
      <footer>
        <div className="footer-section">
           <ul className="list-icons">
            <a href=""><img src="./github.svg" alt="" /></a>
            <a href=""><img src="./gmail.svg" alt="" /></a>
            <a href=""><img src="./tg.svg" alt="" /></a>
            <a href=""><img src="./linkedIn.svg" alt="" /></a>

           </ul>
           <ul className="list-content">
            
           </ul>
        </div>
      </footer>
      {/* 🌀 Scroll Sections */}
      <div className="sections">
        {sections.map((sec, i) => (
          <div
            key={sec.id}
            className={`section ${i === activeIndex ? "active" : ""}`}
            style={{ backgroundColor: sec.color }}
          >
            {sec.content}
          </div>
        ))}
      </div>

      {/* Modal for full card text */}
      {modalOpen && (
        <div
          className={`modal-overlay ${modalClosing ? 'closing' : 'show'}`}
          onClick={() => {
            // start closing animation then remove
            setModalClosing(true);
            setTimeout(() => {
              setModalOpen(false);
              setModalClosing(false);
            }, 260);
          }}
        >
          <div
            className={`modal-content ${modalClosing ? 'closing' : 'show'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => {
                setModalClosing(true);
                setTimeout(() => {
                  setModalOpen(false);
                  setModalClosing(false);
                }, 260);
              }}
            >
              ✕
            </button>
            <h2>{modalContent.title}</h2>
            <div className="modal-body">
              <p>{modalContent.text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

