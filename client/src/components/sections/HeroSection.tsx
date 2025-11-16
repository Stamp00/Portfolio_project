import SocialLink from '../SocialLink';
import ProfilePic from '../illustrations/ProfilePic';
import './HeroSection.css';

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

const HeroSection = ({ name, title, bio, linkedinUrl, githubUrl }: HeroSectionProps) => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Left: Text Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            {name}'s<br />Portfolio
          </h1>

          <div className="hero-text-content">
            <h2 className="hero-subtitle">
              {title}
            </h2>

            <p className="hero-bio">
              {bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            {linkedinUrl && <SocialLink platform="linkedin" href={linkedinUrl} variant="light" />}
            {githubUrl && <SocialLink platform="github" href={githubUrl} variant="light" />}
          </div>
        </div>

        {/* Right: Profile Picture */}
        <div className="hero-profile">
          <div className="hero-profile-frame">
            <div className="hero-profile-inner">
              <ProfilePic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
