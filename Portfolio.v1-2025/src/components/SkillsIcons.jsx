import React, { useRef } from "react";
import "../styles/About_section.css"; // if you want the CSS here

function SkillsIcons({ icons }) {
  const containerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  // Desktop drag handlers
  const onMouseDown = (e) => {
    isDown = true;
    containerRef.current.classList.add("active");
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };
  const onMouseLeave = () => { isDown = false; containerRef.current.classList.remove("active"); };
  const onMouseUp = () => { isDown = false; containerRef.current.classList.remove("active"); };
  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    containerRef.current.scrollLeft = scrollLeft - (x - startX);
  };

  // Mobile touch handlers
  const onTouchStart = (e) => {
    isDown = true;
    startX = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };
  const onTouchEnd = () => { isDown = false; };
  const onTouchMove = (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    containerRef.current.scrollLeft = scrollLeft - (x - startX);
  };

  return (
    <div
      className="skills-icons"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {icons.map((icon) => (
        <img key={icon.name} src={icon.url} alt={icon.name} className="skill-icon" />
      ))}
    </div>
  );
}

export default SkillsIcons;
