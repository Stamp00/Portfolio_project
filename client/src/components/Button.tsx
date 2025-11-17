import type { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const Button = ({ children, onClick, href, className = '' }: ButtonProps) => {
  const buttonClasses = `button ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
