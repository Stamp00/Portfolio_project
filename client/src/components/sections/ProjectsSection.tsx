import ProjectsRetroScreen from '../ProjectsRetroScreen';
import FileExplorer, { type FileItem } from '../FileExplorer';
import type { Project } from '../../types';
import { convertProjectToFileItem } from '../../utils/projectFileConverter';
import './ProjectsSection.css';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  // Convert projects to file system structure
  const fileSystemItems: FileItem[] = projects.map(convertProjectToFileItem);

  // You can add additional files/folders here, like certificates
  // Example:
  // fileSystemItems.push({
  //   id: 'cert-1',
  //   name: 'AWS Certificate.pdf',
  //   type: 'certificate',
  //   content: 'AWS Certified Developer - Associate',
  //   url: '/certificates/aws-cert.pdf'
  // });

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">
          Projects & Education
        </h2>

        {/* Desktop Version - Retro Computer Screen */}
        <div className="projects-screen-wrapper projects-desktop">
          <ProjectsRetroScreen>
            {fileSystemItems.length === 0 ? (
              <div className="projects-empty">
                <p className="projects-empty-text">
                  No projects yet. Check back soon!
                </p>
              </div>
            ) : (
              <FileExplorer items={fileSystemItems} />
            )}
          </ProjectsRetroScreen>
        </div>

        {/* Mobile Version - Clean Layout (no TV frame) */}
        <div className="projects-mobile">
          {fileSystemItems.length === 0 ? (
            <div className="projects-mobile-empty">
              <p>No projects yet. Check back soon!</p>
            </div>
          ) : (
            <FileExplorer items={fileSystemItems} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
