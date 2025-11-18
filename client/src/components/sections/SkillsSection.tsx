// SkillsSection.tsx
import { useState, useEffect } from 'react';
import RetroComputer from '../illustrations/RetroComputer';
import StackScreen from '../illustrations/StackScreen';
import { getAllSkills } from '../../services/api';
import type { Skill } from '../../types';
import './SkillsSection.css';

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Frontend');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Frontend', 'Backend', 'DevOps', 'UI/UX', 'AI'];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const allSkills = await getAllSkills();
        setSkills(allSkills);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Filter skills by category for mobile view
  const categorySkills = skills
    .filter((skill) => skill.category === selectedCategory)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="skills" className="skills-section">
      {/* Desktop Version with Computer Illustration */}
      <div className="skills-container skills-desktop">
        {/* Left: Retro Computer */}
        <div className="skills-computer" style={{ position: 'relative' }}>
          <RetroComputer />
          {/* Stack Screen overlay */}
          <div
            style={{
              position: 'absolute',
              top: '19.7%',
              left: '29.9%',
              width: '31.1%',
              height: '28.7%',
            }}
          >
            <StackScreen
              category={
                selectedCategory as 'Frontend' | 'Backend' | 'DevOps' | 'UI/UX' | 'AI'
              }
            />
          </div>
        </div>

        {/* Right: Stack Menu */}
        <div className="skills-menu">
          <h2 className="skills-title">My Stack</h2>

          <div className="skills-panel">
            <div className="skills-buttons">
              {categories.map((category) => (
                <div key={category} className="skills-button-wrapper">
                  <button
                    className={`skills-category-button ${
                      selectedCategory === category ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Simple Clean Layout */}
      <div className="skills-mobile">
        <h2 className="skills-mobile-title">My Stack</h2>

        {/* Category Tabs */}
        <div className="skills-mobile-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`skills-mobile-tab ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-mobile-grid">
          {loading ? (
            <div className="skills-mobile-loading">Loading skills...</div>
          ) : categorySkills.length === 0 ? (
            <div className="skills-mobile-empty">No skills in this category yet</div>
          ) : (
            categorySkills.map((skill) => (
              <div key={skill._id} className="skills-mobile-item">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="skills-mobile-icon"
                />
                <span className="skills-mobile-name">{skill.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

