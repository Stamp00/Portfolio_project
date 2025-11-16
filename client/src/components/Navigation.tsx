import { useState, useEffect } from 'react';
import Button from './Button';
import './Navigation.css';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'My Stack', id: 'skills' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact Info', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <a
            href="#home"
            onClick={(e) => handleClick(e, 'home')}
            className="nav-logo-link"
          >
            <div className="nav-logo-outer">
              <div className="nav-logo-inner">
                <div className="nav-logo-text-wrapper">
                  <p className="nav-logo-text">
                    Samuel Jaari
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Menu and Resume */}
        <div className="nav-menu-container">
          {/* Menu Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <p key={link.id} className="nav-link-item">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleClick(e, link.id)}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              </p>
            ))}
          </div>

          {/* Get Resume Button */}
          <div className="nav-resume">
            <Button
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="button-resume"
            >
              <span>Get Resume</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
