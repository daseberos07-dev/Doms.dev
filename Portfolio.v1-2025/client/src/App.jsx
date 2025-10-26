import { useEffect, useState } from "react";
import './styles/Navbar.css';
import './styles/Footer.css';
import ProjectsCarousel from './components/ProjectsCarousel';
import HeroSection from './components/Hero_Section';
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/Contact_Section";


/* import icons footer */
import github from './assets/footer-icons/github.svg';
import gmail from './assets/footer-icons/gmail.svg';
import tg from './assets/footer-icons/tg.svg';
import linkedIn from './assets/footer-icons/linkedIn.svg';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  // modal state for showing full card text
  const [modalOpen, setModalOpen] = useState(false);

  const sections = [
    {
      id: 1,
      content: (
        <HeroSection />
      ),
      color: "",
    },
    {
      id: 2,
       content: <AboutSection setModalOpen={setModalOpen} modalOpen={modalOpen} />,
       color: "",
    },
    {
      id: 3,
      content: (
        <section className="projects-section">
          <ProjectsCarousel setModalOpen={setModalOpen} modalOpen={modalOpen} />,
        
        </section>
      ),
      color: "",
    },
    {
      id: 4,
      content: (
        <section className="contact-section">
          <ContactSection />
        
        </section>
      ),
      color: "",
    },
  ];
  
  useEffect(() => {
  // 🧠 Effect 1: Scroll handling (disabled when modal is open)
  if (modalOpen) return; // Skip adding listeners if modal is open

  let startY = 0;

  const handleWheel = (e) => {
    if (scrolling) return;
    setScrolling(true);

    if (modalOpen) setModalOpen(false);

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


    if (modalOpen) setModalOpen(false);

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
}, [activeIndex, scrolling, modalOpen, sections.length]);


// 🧠 Effect 2: Modal open/close behavior & console logs
useEffect(() => {
  if (modalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    console.log("Modal closed — scroll enabled ♻️");
  }
}, [modalOpen]);



  return (
    <>

          {/* NAVBAR */}
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
                      setModalOpen(false); // ✅ Close modal on nav click
                    }}
                    className={i === activeIndex ? "active" : ""}
                  >
                    {["Home", "About", "Projects", "Contact"][i]}
                  </a>
                ))}
              </nav>
            </div>
          </header>


          {/* MAIN CONTENT */}
          <main>
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
          </main>


        {/* FOOTER SECTIOn */}
            <footer>
              <div className="footer-section">
                <ul className="list-icons">
                  <a href=""><img src={github} alt="" /></a>
                  <a href=""><img src={tg} alt="" /></a>
                  <a href=""><img src={gmail} alt="" /></a>
                  <a href=""><img src={linkedIn} alt="" /></a>

                </ul>
                <ul className="list-content">
                  
                </ul>
              </div>
            </footer>

    


     
    </>
  );
}

export default App;

