// SkillsSection.tsx
import { useState } from 'react';
import RetroComputer from '../illustrations/RetroComputer';
import StackScreen from '../illustrations/StackScreen';
import './SkillsSection.css';

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Frontend');

  const categories = ['Frontend', 'Backend', 'DevOps', 'UI/UX', 'AI'];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
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
    </section>
  );
};

export default SkillsSection;

