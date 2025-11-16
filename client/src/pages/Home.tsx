import { useState, useEffect } from 'react';
import { getHeroInfo, getAboutInfo, getContactInfo, getProjects } from '../services/api';
import type { HeroInfo, AboutInfo, ContactInfo, Project } from '../types';
import HeroSection from '../components/sections/HeroSection';
import SkillsSection from '../components/sections/SkillsSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';

const Home = () => {
  const [heroInfo, setHeroInfo] = useState<HeroInfo | null>(null);
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroData, aboutData, contactData, projectsData] = await Promise.all([
          getHeroInfo(),
          getAboutInfo(),
          getContactInfo(),
          getProjects(),
        ]);
        setHeroInfo(heroData);
        setAboutInfo(aboutData);
        setContactInfo(contactData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner animate-spin"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (!heroInfo || !aboutInfo || !contactInfo) {
    return (
      <div className="error-container">
        <div className="error-text">Failed to load content</div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        name={heroInfo.header}
        title={heroInfo.subheader}
        bio={heroInfo.text}
        linkedinUrl={contactInfo.linkedinUrl}
        githubUrl={contactInfo.githubUrl}
      />

      <SkillsSection />

      <AboutSection
        bio={aboutInfo.text}
      />

      <ProjectsSection projects={projects} />

      <ContactSection
        email={contactInfo.email}
        phone={contactInfo.phone}
        location={contactInfo.location}
        linkedinUrl={contactInfo.linkedinUrl}
        githubUrl={contactInfo.githubUrl}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} {heroInfo.header}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
