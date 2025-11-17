import RetroScreen from './RetroScreen';
import ProjectFolder from './ProjectFolder';

interface Project {
  id: string;
  name: string;
}

interface ProjectsScreenProps {
  projects?: Project[];
  onProjectClick?: (project: Project) => void;
}

const ProjectsScreen = ({ projects = [], onProjectClick }: ProjectsScreenProps) => {
  // Default projects if none provided
  const defaultProjects: Project[] = [
    { id: '1', name: 'Project name' },
    { id: '2', name: 'Project name' },
    { id: '3', name: 'Project name' },
    { id: '4', name: 'Project name' },
    { id: '5', name: 'Project name' },
    { id: '6', name: 'Project name' },
    { id: '7', name: 'Project name' },
    { id: '8', name: 'Project name' },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <RetroScreen>
      {displayProjects.map((project) => (
        <ProjectFolder
          key={project.id}
          name={project.name}
          onClick={() => onProjectClick?.(project)}
        />
      ))}
    </RetroScreen>
  );
};

export default ProjectsScreen;
