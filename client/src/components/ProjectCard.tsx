interface ProjectCardProps {
  name: string;
  description?: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  onClick?: () => void;
}

const ProjectCard = ({ name, description, imageUrl, projectUrl, githubUrl, onClick }: ProjectCardProps) => {
  return (
    <div
      className="project-card"
      onClick={onClick}
    >
      {/* Project Folder Icon */}
      <div className="project-card-image-wrapper">
        <img
          src={imageUrl || "/project-folder.svg"}
          alt={name}
          className="project-card-image"
        />
      </div>

      {/* Project Name */}
      <p className="project-card-name">
        {name}
      </p>

      {/* Optional Description */}
      {description && (
        <p className="project-card-description">
          {description}
        </p>
      )}

      {/* Optional Links */}
      {(projectUrl || githubUrl) && (
        <div className="project-card-links">
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              onClick={(e) => e.stopPropagation()}
            >
              View →
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              onClick={(e) => e.stopPropagation()}
            >
              Code →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
