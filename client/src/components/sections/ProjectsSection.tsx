import ProjectCard from '../ProjectCard';
import type { Project } from '../../types';
import './ProjectsSection.css';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">
          My Projects
        </h2>

        {/* Retro TV Screen */}
        <div className="projects-tv">
          {/* TV Frame */}
          <div className="projects-tv-frame">
            {/* TV Screen */}
            <div className="projects-tv-screen">
              {projects.length === 0 ? (
                <div className="projects-empty">
                  <p className="projects-empty-text">
                    No projects yet. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="projects-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project._id}
                      name={project.title}
                      description={project.description}
                      imageUrl={project.imageUrl}
                      projectUrl={project.projectUrl}
                      githubUrl={project.githubUrl}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
