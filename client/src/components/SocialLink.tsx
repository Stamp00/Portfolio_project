interface SocialLinkProps {
  platform: 'linkedin' | 'github';
  href: string;
  variant?: 'dark' | 'light';
  className?: string;
}

const SocialLink = ({ platform, href, variant = 'dark', className = '' }: SocialLinkProps) => {
  const iconMap = {
    linkedin: {
      dark: '/icons/linkedin-dark.svg',
      light: '/icons/linkedin-light.svg',
    },
    github: {
      dark: '/icons/github-dark.svg',
      light: '/icons/github-light.svg',
    },
  };

  const platformNames = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-link ${className}`}
      aria-label={platformNames[platform]}
    >
      <img
        src={iconMap[platform][variant]}
        alt={platformNames[platform]}
        className="social-link-icon"
      />
    </a>
  );
};

export default SocialLink;
