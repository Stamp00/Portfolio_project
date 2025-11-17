import type { ReactNode } from 'react';
import './SpeechBubble.css';

interface SpeechBubbleProps {
  children: ReactNode;
  className?: string;
  tailPosition?: 'left' | 'right' | 'none';
}

const SpeechBubble = ({ children, className = '' }: SpeechBubbleProps) => {
  return (
    <div className={`speech-bubble ${className}`}>
      {/* SVG Background with tail */}
      <div className="speech-bubble__bg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 608 969"
          className="speech-bubble__svg"
        >
          <path
            className="speech-bubble__shape"
            d="M140.101 206.908C52.0328 206.467 1.66179 239.979 1.66179 239.979C1.66179 239.979 103.947 206.032 140.572 274.251L141.197 871.085C140.727 964.906 232.354 965.361 232.354 965.361C232.354 965.361 412.815 964.738 508.519 965.218C604.223 965.698 604.267 870.846 604.267 870.846L604.63 103.043C605.159 -2.29919 519.968 3.04544 519.968 3.04544L232.804 4.66028C141.982 11.3375 141.56 95.2824 141.56 95.2824L140.101 206.908Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="speech-bubble__content">
        <div className="speech-bubble__text">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SpeechBubble;

