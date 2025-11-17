import type { ReactNode } from 'react';
import './RetroScreen.css';

interface RetroScreenProps {
  children: ReactNode;
}

const RetroScreen = ({ children }: RetroScreenProps) => {
  return (
    <div className="retro-screen">
      {/* Outer frame */}
      <div className="retro-screen-outer">
        <img src="/tv-frame-outer.svg" alt="" />
      </div>

      {/* Inner frame */}
      <div className="retro-screen-inner">
        <img src="/tv-frame-inner.svg" alt="" />
      </div>

      {/* Screen background */}
      <div className="retro-screen-bg">
        <img src="/tv-screen.svg" alt="" />
      </div>

      {/* Content area */}
      <div className="retro-screen-content">
        {children}
      </div>

      {/* Button decoration */}
      <div className="retro-screen-button">
        <div className="retro-screen-button-shadow" />
        <div className="retro-screen-button-face" />
      </div>
    </div>
  );
};

export default RetroScreen;
