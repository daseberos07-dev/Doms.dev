import React from "react";
import "../App.css"; // keep styling linked here
import '../styles/Hero_section.css';
import profileImg from '../assets/bg-images/noBG_prof.png';

const HeroSection = () => {
  return (
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
          Computer Science student who loves crafting modern, interactive, and
          well-designed web applications.
        </p>

        <a href="#portfolio" className="btn">
          View My Work
        </a>
      </div>

      <div className="hero-profile">
        <img src={profileImg}/>
      </div>
    </section>
  );
};

export default HeroSection;
