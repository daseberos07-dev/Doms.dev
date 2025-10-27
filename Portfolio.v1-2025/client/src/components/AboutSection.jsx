// src/components/AboutSection.jsx
import React, { useState, useEffect } from "react";
import aboutCards from "../data/aboutCards"; 
import '../styles/About_section.css';
import SkillsIcons from "./SkillsIcons";

const AboutSection = ({ setModalOpen, modalOpen }) => {
  const [modalContent, setModalContent] = useState({ title: "", text: "" });
  const [modalClosing, setModalClosing] = useState(false);
  const [localModalVisible, setLocalModalVisible] = useState(false);

  const openModal = (card) => {
    setModalContent(card);
    setModalClosing(false);
    setLocalModalVisible(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setLocalModalVisible(false);
      setModalClosing(false);
      setModalOpen(false);
    }, 260);
  };

  // 🧠 Close modal if parent sets modalOpen to false
  useEffect(() => {
    if (!modalOpen && localModalVisible) {
      setLocalModalVisible(false);
      setModalClosing(false);
    }
  }, [modalOpen]);

  return (
    <section className="about-section">
      <div className="titles-container">
        <div className="about-titles-grid">
          {aboutCards.map((card, i) => (
            <button

              style={{
                backgroundImage: `url(${card.image})`,
              }}


              key={i}
              type="button"
              className="title-btn"
              onClick={() => openModal(card)}
            >
              {card.title}
            </button>
          ))}
        </div>
      </div>

    {localModalVisible && (
  <div
  className={`about-modal-overlay ${modalClosing ? "closing" : "show"}`}
  onClick={closeModal}
>
  <div
    className={`about-modal-content ${modalClosing ? "closing" : "show"}`}
    onClick={(e) => e.stopPropagation()}
    role="dialog"
    aria-modal="true"
    style={{ backgroundImage: `url(${modalContent.image || ''})` }}
  >

    <div className="about-modal-title-wrapper">
      <h2>{modalContent.title}</h2>
    </div>

    <div className="about-modal-body-wrapper">
      <div className="about-modal-body">
        <p>{modalContent.text}</p>

{modalContent.type === "education" && modalContent.logo_img && (
  <div className="education-container">
    <div className="education-logo">
      <img 
        src={modalContent.logo_img} 
        alt="Education Logo" 
      />
    </div>
    <div className="education-description">
      <p>{modalContent.description}</p>
      <p className="education-year">{modalContent.year}</p>
    </div>
  </div>
)}

        {/* Only show categories and icons for "My Skills" */}
  {modalContent.title === "My Skills" && modalContent.categories && (
  <>
    <SkillsIcons icons={modalContent.icons} />
    <div className="skills-categories">
      {Object.entries(modalContent.categories).map(([category, skills]) => (
        <div key={category} className="skill-category">
          <h4>{category}</h4>
          <ul>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </>
)}

      </div>
    </div>
  </div>
</div>

)}


    </section>
  );
};

export default AboutSection;
