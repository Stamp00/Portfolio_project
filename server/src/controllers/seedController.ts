import type { Request, Response } from 'express';
import PersonalInfo from '../models/PersonalInfo';
import HeroInfo from '../models/HeroInfo';
import AboutInfo from '../models/AboutInfo';
import ContactInfo from '../models/ContactInfo';
import Skill from '../models/Skill';
import Experience from '../models/Experience';
import Education from '../models/Education';

export const seedDatabase = async (req: Request, res: Response) => {
  try {
    // Clear existing data
    await Promise.all([
      PersonalInfo.deleteMany({}),
      HeroInfo.deleteMany({}),
      AboutInfo.deleteMany({}),
      ContactInfo.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
    ]);

    // Seed Personal Info (Legacy - keep for backward compatibility)
    const personalInfo = new PersonalInfo({
      name: 'Samuel Jaari',
      title: 'Full Stack Developer',
      email: 'Jaari.samuel00@gmail.com',
      location: 'Helsinki, Finland',
      bio: `Hi! I'm Samuel, a Full Stack Developer based in Helsinki, Finland.`,
      githubUrl: 'https://github.com/Stamp00',
      linkedinUrl: 'https://www.linkedin.com/in/samuel-jaari-b3b681198/',
    });
    await personalInfo.save();

    // Seed Hero Info
    const heroInfo = new HeroInfo({
      header: 'Samuel Jaari',
      subheader: 'Full Stack Developer',
      text: 'Building digital experiences with code. Passionate about creating intuitive and engaging web applications.',
    });
    await heroInfo.save();

    // Seed About Info
    const aboutInfo = new AboutInfo({
      text: `Hi! I'm Samuel, a Full Stack Developer based in Helsinki, Finland. I've always loved building things – from the time I was a little kid creating with my hands, to now crafting digital experiences through code.

As I got older and discovered computers, I realized there was a whole new world for me to build in. This passion led me to pursue Computer Science at Åbo Akademi after graduating high school, where I've been studying since 2020.

What I love most about development is the thrill of finding solutions to complex problems. Whether I'm working on the frontend creating intuitive interfaces or diving into backend logic, I find joy in both. I'm particularly passionate about UI/UX design and believe that great functionality should always be paired with thoughtful design. Beyond web development, I also enjoy playing around with hardware and IT-oriented projects.

When I'm not coding, you'll find me on the golf course, at the gym, fishing, cooking up something new in the kitchen, or working on physical projects – because my love for building extends beyond the digital world!`,
    });
    await aboutInfo.save();

    // Seed Contact Info
    const contactInfo = new ContactInfo({
      email: 'Jaari.samuel00@gmail.com',
      phone: '+358 123 456 789',
      location: 'Helsinki, Finland',
      githubUrl: 'https://github.com/Stamp00',
      linkedinUrl: 'https://www.linkedin.com/in/samuel-jaari-b3b681198/',
      twitterUrl: '',
    });
    await contactInfo.save();

    // Seed Skills with Devicon icons
    const skills = [
      // Frontend
      { name: 'React', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', order: 0 },
      { name: 'TypeScript', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', order: 1 },
      { name: 'JavaScript', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', order: 2 },
      { name: 'HTML5', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', order: 3 },
      { name: 'CSS3', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', order: 4 },
      { name: 'Tailwind CSS', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', order: 5 },
      // Backend
      { name: 'Node.js', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', order: 0 },
      { name: 'Express', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', order: 1 },
      { name: 'MongoDB', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', order: 2 },
      { name: 'Python', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', order: 3 },
      // DevOps
      { name: 'Git', category: 'DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', order: 0 },
      { name: 'Docker', category: 'DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', order: 1 },
      { name: 'Vercel', category: 'DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', order: 2 },
      { name: 'GitHub', category: 'DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', order: 3 },
      // UI/UX
      { name: 'Figma', category: 'UI/UX', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', order: 0 },
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
        heroInfo: 1,
        aboutInfo: 1,
        contactInfo: 1,
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
