import { useState, useEffect } from 'react';
import { getAllSkills } from '../../services/api';
import type { Skill } from '../../types';

// Background vectors
const imgVector = "/stack-screen-frame.svg";
const imgVector1 = "/stack-screen-border1.svg";
const imgVector2 = "/stack-screen-border2.svg";

type CategoryType = 'Frontend' | 'Backend' | 'DevOps' | 'UI/UX' | 'AI';

interface StackScreenProps {
  category?: CategoryType;
}

interface SkillIconProps {
  icon: string;
  name: string;
}

const SkillIcon = ({ icon, name }: SkillIconProps) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      title={name}
    >
      <img
        alt={name}
        src={icon}
        style={{
          display: 'block',
          maxWidth: 'none',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

const StackScreen = ({ category = 'Frontend' }: StackScreenProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Filter skills by category and sort by order
  const categorySkills = skills
    .filter((skill) => skill.category === category)
    .sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ color: '#666', fontSize: '12px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="stack-screen-root"
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* Background frame (static) */}
      <div
        style={{
          position: 'absolute',
          top: '2.27%',
          right: '1.91%',
          bottom: '5.29%',
          left: '2.61%',
        }}
      >
        <img
          alt=""
          src={imgVector}
          style={{
            display: 'block',
            maxWidth: 'none',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Icons Grid wrapper (static) */}
      <div
        className="stack-screen-grid-wrapper"
        style={{
          position: 'absolute',
          top: '15%',
          left: '12%',
          right: '15%',
          bottom: '15%',
        }}
      >
        {/* 👉 Only THIS div is keyed and animated */}
        <div key={category} className="stack-screen-grid">
          {categorySkills.map((skill) => (
            <div
              key={skill._id}
              style={{
                width: '45px',
                height: '45px',
              }}
            >
              <SkillIcon icon={skill.icon} name={skill.name} />
            </div>
          ))}
        </div>
      </div>

      {/* Top overlay (static) */}
      <div
        className="stack-screen-overlay-top"
        style={{
          position: 'absolute',
          top: '1.63%',
          right: '0.33%',
          bottom: '6.65%',
          left: '0.65%',
          pointerEvents: 'none',
        }}
      >
        <img
          alt=""
          src={imgVector1}
          style={{
            display: 'block',
            maxWidth: 'none',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Bottom overlay (static) */}
      <div
        className="stack-screen-overlay-bottom"
        style={{
          position: 'absolute',
          top: '-1.3%',
          right: '0.04%',
          bottom: '2.09%',
          left: '-0.65%',
          pointerEvents: 'none',
        }}
      >
        <img
          alt=""
          src={imgVector2}
          style={{
            display: 'block',
            maxWidth: 'none',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default StackScreen;


