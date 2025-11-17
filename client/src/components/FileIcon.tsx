import FolderIcon from './illustrations/FolderIcon';
import './FileIcon.css';

type FileType = 'folder' | 'image' | 'pdf' | 'link' | 'certificate';

interface FileIconProps {
  type: FileType;
  name: string;
  onClick?: () => void;
}

const FileIcon = ({ type, name, onClick }: FileIconProps) => {
  const renderIcon = () => {
    switch (type) {
      case 'folder':
        return <FolderIcon className="file-icon-image" />;
      case 'certificate':
      case 'pdf':
        return (
          <div className="file-icon-pdf">
            <svg width="100%" height="100%" viewBox="0 0 100 120" fill="none">
              <path d="M20 0H65L90 25V110C90 115.523 85.523 120 80 120H20C14.477 120 10 115.523 10 110V10C10 4.477 14.477 0 20 0Z" fill="#ED6A5A"/>
              <path d="M65 0L90 25H75C69.477 25 65 20.523 65 15V0Z" fill="#C85A4A"/>
              <text x="50" y="75" textAnchor="middle" fill="white" fontSize="24" fontFamily="Squada One">PDF</text>
            </svg>
          </div>
        );
      case 'image':
        return (
          <div className="file-icon-image-file">
            <svg width="100%" height="100%" viewBox="0 0 100 120" fill="none">
              <path d="M20 0H65L90 25V110C90 115.523 85.523 120 80 120H20C14.477 120 10 115.523 10 110V10C10 4.477 14.477 0 20 0Z" fill="#9BC1BC"/>
              <path d="M65 0L90 25H75C69.477 25 65 20.523 65 15V0Z" fill="#85A9A4"/>
              <circle cx="50" cy="60" r="15" fill="white" opacity="0.8"/>
              <path d="M30 90L45 70L55 80L70 60L80 90H30Z" fill="white" opacity="0.8"/>
            </svg>
          </div>
        );
      case 'link':
        return (
          <div className="file-icon-link">
            <svg width="100%" height="100%" viewBox="0 0 100 120" fill="none">
              <path d="M20 0H65L90 25V110C90 115.523 85.523 120 80 120H20C14.477 120 10 115.523 10 110V10C10 4.477 14.477 0 20 0Z" fill="#F4F1BB"/>
              <path d="M65 0L90 25H75C69.477 25 65 20.523 65 15V0Z" fill="#D0CE9D"/>
              <text x="50" y="75" textAnchor="middle" fill="#66635B" fontSize="18" fontFamily="Squada One">LINK</text>
            </svg>
          </div>
        );
      default:
        return <FolderIcon className="file-icon-image" />;
    }
  };

  return (
    <div className="file-icon-wrapper" onClick={onClick}>
      <div className="file-icon-graphic">
        {renderIcon()}
      </div>
      <p className="file-icon-name">{name}</p>
    </div>
  );
};

export default FileIcon;
