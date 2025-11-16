interface SkillIconProps {
  skill: 'javascript' | 'react' | 'typescript' | 'svelte' | 'nodejs' | 'html' | 'swift' | 'vercel' | 'gcloud' | 'mongodb' | 'figma' | 'sql' | 'git' | 'java';
  className?: string;
}

const SkillIcon = ({ skill, className = '' }: SkillIconProps) => {
  const iconMap = {
    javascript: '/icons/javascript.svg',
    react: '/icons/react.svg',
    typescript: '/icons/typescript.svg',
    svelte: '/icons/svelte.svg',
    nodejs: '/icons/nodejs.svg',
    html: '/icons/html.svg',
    swift: '/icons/swift.svg',
    vercel: '/icons/vercel.svg',
    gcloud: '/icons/gcloud.svg',
    mongodb: '/icons/mongodb.svg',
    figma: '/icons/figma.svg',
    sql: '/icons/sql.svg',
    git: '/icons/git.svg',
    java: '/icons/java.svg',
  };

  const skillNames = {
    javascript: 'JavaScript',
    react: 'React',
    typescript: 'TypeScript',
    svelte: 'Svelte',
    nodejs: 'Node.js',
    html: 'HTML',
    swift: 'Swift',
    vercel: 'Vercel',
    gcloud: 'Google Cloud',
    mongodb: 'MongoDB',
    figma: 'Figma',
    sql: 'SQL',
    git: 'Git',
    java: 'Java',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="w-14 h-14 flex items-center justify-center">
        <img
          src={iconMap[skill]}
          alt={skillNames[skill]}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default SkillIcon;
