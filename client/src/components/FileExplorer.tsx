import { useState } from 'react';
import FileIcon from './FileIcon';
import Button from './Button';
import './FileExplorer.css';

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'pdf' | 'link' | 'certificate';
  content?: string; // For descriptions, links, etc.
  url?: string; // For links, images, PDFs
  items?: FileItem[]; // For folders containing other items
  // Project metadata (for folders)
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  projectUrl?: string;
  githubUrl?: string;
}

interface FileExplorerProps {
  items: FileItem[];
}

const FileExplorer = ({ items }: FileExplorerProps) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null);

  // Get current directory items
  const getCurrentItems = (): FileItem[] => {
    let current = items;
    for (const pathPart of currentPath) {
      const folder = current.find(item => item.id === pathPart && item.type === 'folder');
      if (folder && folder.items) {
        current = folder.items;
      }
    }
    return current;
  };

  // Get current folder object
  const getCurrentFolder = (): FileItem | null => {
    if (currentPath.length === 0) return null;

    let current = items;
    let currentFolder: FileItem | null = null;

    for (const pathPart of currentPath) {
      const folder = current.find(item => item.id === pathPart && item.type === 'folder');
      if (folder) {
        currentFolder = folder;
        if (folder.items) {
          current = folder.items;
        }
      }
    }

    return currentFolder;
  };

  // Get current folder name
  const getCurrentFolderName = (): string => {
    const folder = getCurrentFolder();
    return folder ? folder.name : '';
  };

  const handleItemClick = (item: FileItem) => {
    if (currentPath.length === 0 && item.type === 'folder') {
      // At root level, clicking a folder navigates into it
      setCurrentPath([item.id]);
      // Auto-select the first file (Overview) when entering folder
      if (item.items && item.items.length > 0) {
        setSelectedItem(item.items[0]);
      } else {
        setSelectedItem(null);
      }
    } else if (item.type === 'folder') {
      // Inside a folder, clicking another folder navigates into it
      setCurrentPath([...currentPath, item.id]);
      // Auto-select the first file when entering nested folder
      if (item.items && item.items.length > 0) {
        setSelectedItem(item.items[0]);
      } else {
        setSelectedItem(null);
      }
    } else {
      // Clicking a file selects it for preview
      setSelectedItem(item);
    }
  };

  const handleBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const handleHome = () => {
    setCurrentPath([]);
    setSelectedItem(null);
  };

  const currentItems = getCurrentItems();
  const isInFolder = currentPath.length > 0;

  // Root level: Grid view of project folders
  if (!isInFolder) {
    return (
      <div className="file-explorer">
        <div className="file-explorer-grid">
          {currentItems.length === 0 ? (
            <div className="file-explorer-empty">
              <p>No projects yet</p>
            </div>
          ) : (
            currentItems.map((item) => (
              <FileIcon
                key={item.id}
                type={item.type}
                name={item.name}
                onClick={() => handleItemClick(item)}
              />
            ))
          )}
        </div>
      </div>
    );
  }

  // Inside folder: Split view with list on left and preview on right
  return (
    <div className="file-explorer">
      <div className="file-explorer-toolbar">
        <Button onClick={handleBack}>← Back</Button>
        <Button onClick={handleHome}>🏠 Home</Button>
      </div>

      <div className="file-explorer-split">
        {/* Left: File list */}
        <div className="file-explorer-list">
          <div className="file-list-header">
            <h3 className="file-list-title">{getCurrentFolderName()}</h3>
          </div>
          {currentItems.length === 0 ? (
            <div className="file-explorer-empty">
              <p>This folder is empty</p>
            </div>
          ) : (
            currentItems.map((item) => (
              <div
                key={item.id}
                className={`file-list-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <div className="file-list-icon">
                  <FileIcon type={item.type} name={item.name} />
                </div>
                <div className="file-list-name">{item.name}</div>
              </div>
            ))
          )}
        </div>

        {/* Right: File preview */}
        <div className="file-explorer-preview">
          {selectedItem ? (
            <div className="file-viewer">
              <h3 className="file-viewer-title">{selectedItem.name}</h3>

              {selectedItem.type === 'link' && selectedItem.name === 'Overview' && (() => {
                const currentFolder = getCurrentFolder();
                return (
                  <div className="file-viewer-content">
                    {currentFolder?.imageUrl && (
                      <img
                        src={currentFolder.imageUrl}
                        alt={currentFolder.name}
                        className="file-viewer-image"
                      />
                    )}
                    {selectedItem.content && (
                      <p className="file-viewer-description">{selectedItem.content}</p>
                    )}
                    {currentFolder?.technologies && currentFolder.technologies.length > 0 && (
                      <div className="project-technologies">
                        <h4 className="project-technologies-title">Technologies:</h4>
                        <p className="file-viewer-description">{currentFolder.technologies.join(', ')}</p>
                      </div>
                    )}
                    <div className="project-links">
                      {currentFolder?.githubUrl && (
                        <a
                          href={currentFolder.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="file-viewer-link"
                        >
                          View on GitHub →
                        </a>
                      )}
                      {currentFolder?.projectUrl && (
                        <a
                          href={currentFolder.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="file-viewer-link"
                        >
                          View Live Project →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })()}

              {selectedItem.type === 'link' && selectedItem.name !== 'Overview' && (
                <div className="file-viewer-content">
                  {selectedItem.content && (
                    <p className="file-viewer-description">{selectedItem.content}</p>
                  )}
                  {!selectedItem.content && (
                    <p className="file-viewer-description">No description available.</p>
                  )}
                  {selectedItem.url && (
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-viewer-link"
                    >
                      Open Link →
                    </a>
                  )}
                </div>
              )}

              {selectedItem.type === 'image' && (
                <div className="file-viewer-content">
                  {selectedItem.url ? (
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.name}
                      className="file-viewer-image"
                    />
                  ) : (
                    <p className="file-viewer-description">Image URL not available</p>
                  )}
                  {selectedItem.content && (
                    <p className="file-viewer-description">{selectedItem.content}</p>
                  )}
                </div>
              )}

              {(selectedItem.type === 'pdf' || selectedItem.type === 'certificate') && (
                <div className="file-viewer-content">
                  {selectedItem.content && (
                    <p className="file-viewer-description">{selectedItem.content}</p>
                  )}
                  {selectedItem.url && (
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-viewer-link"
                    >
                      View {selectedItem.type === 'certificate' ? 'Certificate' : 'PDF'} →
                    </a>
                  )}
                  {!selectedItem.url && (
                    <p className="file-viewer-description">File URL not available</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="file-viewer-placeholder">
              <p>Select a file to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
