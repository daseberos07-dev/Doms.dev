import startedImg from '../assets/started.svg';
import getToKnowMe from '../assets/getToKnowMe.svg';
import howIsIt from '../assets/howIsIt.svg';
import whatIknow from '../assets/whatIknow.svg';
import mySkills from '../assets/mySkills.svg';
import myGoal from '../assets/myGoal.svg';
import quote from '../assets/quote.svg';
import education from '../assets/education.svg';
import logoImg from '../assets/logoUMTC.svg';

const iconFiles = import.meta.glob('../assets/icons/*.svg', { eager: true });

const icons = Object.entries(iconFiles).map(([path, module]) => {
  const parts = path.split('/');
  const filename = parts[parts.length - 1].replace('.svg', '');
  return {
    name: filename.toLowerCase(),
    url: module.default, // this is the actual URL to use in <img>
  };
});

  const aboutCards = [
    {
      title: "Get to Know Me",
      text: "I’m Domince Aseberos, 22 years old, a Computer Science student and aspiring full-stack developer. I’m passionate about creating customized web applications that blend creativity with real world functionality. I love learning new things, exploring innovative ideas, and turning them into meaningful digital experiences. ",
      image: getToKnowMe,
    },
    {
      title: "How It All Started",
      text: "My journey began with Java as my first programming language, which helped me build logical thinking and problem-solving skills that sparked my interest in software creation.",
      image: startedImg,
    },
    {
      title: "How It Is Now",
      text: "I’ve shifted my focus to full-stack web development, learning how to bring ideas to life through design, interaction, and scalable code that delivers real world value.",
      image: howIsIt,
  
    },
    {
      title: "What I Know",
     text: "I have experience with HTML, CSS, JavaScript, React, plus basic knowledge of PHP and MySQL for database work, and Python, which I’m exploring for AI and Machine Learning.",
      image: whatIknow,
  
    },
    {
       title: "My Skills",
  text: "I focus on building responsive web applications with clean UI, reusable components, and efficient code architecture.",
  image: mySkills,
  icons: icons, // array of { name, url }
  categories: {
    Programming: ["Components","State/Props","Hooks","Event handling","Rendering","Array methods"],
    "UI/UX": ["Responsive design","Accessibility","Interactions","Animations","Visual hierarchy"],
    "Soft Skills": ["Problem-solving","Organization","Attention to detail","UX","Documentation"],
    Practices: ["Clean code","Modularity","DRY","Semantic naming"]
  }
},
    {
      title: "My Goal",
      text: "To build responsive, user-friendly web applications while advancing my full-stack development and AI skills.",
      image: myGoal,
  
    },
    {
      title: "Quote",
      text: "Life flows like a song while coding sometimes fast, sometimes slow, but always moving forward.",

      image: quote,
  
    },

    {
      title: "Education",
      type: "education",      
      text: "University of Mindanao - Tagum College: Bachelor's in Computer Science.",
      logo_img: logoImg,
      image: education,
      description: "Pursuing a Bachelor's degree in Computer Science at the University of Mindanao - Tagum College, focusing on software development, algorithms, and data structures.",
      year: "2022 - Present"
    }
  ]

  export default aboutCards;