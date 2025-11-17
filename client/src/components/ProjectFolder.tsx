import FolderIcon from './illustrations/FolderIcon';
import './ProjectFolder.css';

interface ProjectFolderProps {
  name: string;
  onClick?: () => void;
}

const ProjectFolder = ({ name, onClick }: ProjectFolderProps) => {
  return (
    <div className="project-folder" onClick={onClick}>
      <div className="project-folder-icon">
        <FolderIcon />
      </div>
      <p className="project-folder-name">{name}</p>
    </div>
  );
};

export default ProjectFolder;
