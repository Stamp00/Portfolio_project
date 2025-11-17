import type { ReactNode } from 'react';
import './ProjectsRetroScreen.css';

interface ProjectsRetroScreenProps {
  children: ReactNode;
}

const ProjectsRetroScreen = ({ children }: ProjectsRetroScreenProps) => {
  return (
    <div className="projects-retro-screen">
      {/* Outer frame */}
      <div className="projects-retro-screen-outer">
        <img src="/tv-frame-outer.svg" alt="" />
      </div>

      {/* Inner frame */}
      <div className="projects-retro-screen-inner">
        <img src="/tv-frame-inner.svg" alt="" />
      </div>

      {/* Screen background */}
      <div className="projects-retro-screen-bg">
        <img src="/projects-screen-bg.svg" alt="" />
      </div>

      {/* Content area */}
      <div className="projects-retro-screen-content">
        {children}
      </div>

      {/* Glare overlay effect */}
      <div className="projects-retro-screen-glare">
        <img src="/projects-screen-glare.svg" alt="" />
      </div>

      {/* Button decoration */}
      <div className="projects-retro-screen-button">
        <div className="projects-retro-screen-button-shadow" />
        <div className="projects-retro-screen-button-face" />
      </div>
    </div>
  );
};

export default ProjectsRetroScreen;
