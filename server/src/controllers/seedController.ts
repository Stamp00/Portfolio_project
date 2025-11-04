import type { Request, Response } from 'express';
import PersonalInfo from '../models/PersonalInfo';
import Skill from '../models/Skill';
import Experience from '../models/Experience';
import Education from '../models/Education';

export const seedDatabase = async (req: Request, res: Response) => {
  try {
    // Clear existing data
    await Promise.all([
      PersonalInfo.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
    ]);

    // Seed Personal Info
    const personalInfo = new PersonalInfo({
      name: 'Samuel Jaari',
      title: 'Full Stack Developer',
      email: 'Jaari.samuel00@gmail.com',
      location: 'Helsinki, Finland',
      bio: `Hi! I'm Samuel, a Full Stack Developer based in Helsinki, Finland. I've always loved building things – from the time I was a little kid creating with my hands, to now crafting digital experiences through code.

As I got older and discovered computers, I realized there was a whole new world for me to build in. This passion led me to pursue Computer Science at Åbo Akademi after graduating high school, where I've been studying since 2020.

What I love most about development is the thrill of finding solutions to complex problems. Whether I'm working on the frontend creating intuitive interfaces or diving into backend logic, I find joy in both. I'm particularly passionate about UI/UX design and believe that great functionality should always be paired with thoughtful design. Beyond web development, I also enjoy playing around with hardware and IT-oriented projects.

When I'm not coding, you'll find me on the golf course, at the gym, fishing, cooking up something new in the kitchen, or working on physical projects – because my love for building extends beyond the digital world!`,
      githubUrl: 'https://github.com/Stamp00',
      linkedinUrl: 'https://www.linkedin.com/in/samuel-jaari-b3b681198/',
    });
    await personalInfo.save();

    // Seed Skills
    const skills = [
      // Frontend
      { name: 'React', category: 'Frontend', order: 1 },
      { name: 'TypeScript', category: 'Frontend', order: 2 },
      { name: 'Tailwind CSS', category: 'Frontend', order: 3 },
      { name: 'HTML/CSS', category: 'Frontend', order: 4 },
      // Backend
      { name: 'Node.js', category: 'Backend', order: 1 },
      { name: 'Express', category: 'Backend', order: 2 },
      { name: 'MongoDB', category: 'Backend', order: 3 },
      { name: 'REST APIs', category: 'Backend', order: 4 },
      // Tools & Others
      { name: 'Git', category: 'Tools & Others', order: 1 },
      { name: 'Docker', category: 'Tools & Others', order: 2 },
      { name: 'Vercel', category: 'Tools & Others', order: 3 },
      { name: 'VS Code', category: 'Tools & Others', order: 4 },
    ];
    await Skill.insertMany(skills);

    // Seed Experience
    const experience = new Experience({
      title: 'Full Stack Developer',
      company: 'Folkhälsans Förbund rf',
      period: 'May 2025 - Present',
      description: 'I maintain Läsväskan.fi and developed the new version of "The Great Reading Journey" (Läsväskan.fi/ny_lasresan). Working with modern web technologies to create engaging educational experiences for users.',
      order: 1,
    });
    await experience.save();

    // Seed Education
    const education = new Education({
      degree: 'Bachelor in Computer Science',
      institution: 'Åbo Akademi',
      year: '2020 - 2026',
      description: 'Comprehensive computer science education covering full-stack development, algorithms, data structures, software engineering, and system design.',
      order: 1,
    });
    await education.save();

    res.json({
      message: 'Database seeded successfully',
      data: {
        personalInfo: 1,
        skills: skills.length,
        experience: 1,
        education: 1,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
};
