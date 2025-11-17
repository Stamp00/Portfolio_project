import type { Project } from '../types';
import type { FileItem } from '../components/FileExplorer';

/**
 * Converts a Project into a FileItem (folder) with nested files
 */
export const convertProjectToFileItem = (project: Project): FileItem => {
  const folderItems: FileItem[] = [];

  // Add Overview file as first item
  folderItems.push({
    id: `${project._id}-overview`,
    name: 'Overview',
    type: 'link',
    content: project.description,
    url: project.projectUrl || project.githubUrl,
  });

  // Add GitHub link if available
  if (project.githubUrl) {
    folderItems.push({
      id: `${project._id}-github`,
      name: 'source-code.link',
      type: 'link',
      content: 'View the source code on GitHub',
      url: project.githubUrl,
    });
  }

  // Add live project link if available (and different from GitHub)
  if (project.projectUrl && project.projectUrl !== project.githubUrl) {
    folderItems.push({
      id: `${project._id}-live`,
      name: 'live-demo.link',
      type: 'link',
      content: 'Open the live demo',
      url: project.projectUrl,
    });
  }

  // Add technologies file
  if (project.technologies && project.technologies.length > 0) {
    folderItems.push({
      id: `${project._id}-tech`,
      name: 'technologies.txt',
      type: 'link',
      content: `Technologies used:\n\n${project.technologies.map(tech => `• ${tech}`).join('\n')}`,
    });
  }

  // Add additional files if they exist
  if (project.additionalFiles && project.additionalFiles.length > 0) {
    project.additionalFiles.forEach((file) => {
      folderItems.push({
        id: file.id || `${project._id}-${file.name}`,
        name: file.name,
        type: file.type as 'folder' | 'image' | 'pdf' | 'link' | 'certificate',
        content: file.content,
        url: file.url,
      });
    });
  }

  return {
    id: project._id,
    name: project.title,
    type: 'folder',
    items: folderItems,
    // Add project metadata for the overview
    description: project.description,
    imageUrl: project.imageUrl,
    technologies: project.technologies,
    projectUrl: project.projectUrl,
    githubUrl: project.githubUrl,
  };
};

/**
 * Create a certificate/education file item
 */
export const createCertificateFile = (
  id: string,
  name: string,
  description: string,
  pdfUrl: string
): FileItem => {
  return {
    id,
    name,
    type: 'certificate',
    content: description,
    url: pdfUrl,
  };
};

/**
 * Create a standalone file (image, PDF, etc.)
 */
export const createFile = (
  id: string,
  name: string,
  type: 'image' | 'pdf' | 'link' | 'certificate',
  url: string,
  content?: string
): FileItem => {
  return {
    id,
    name,
    type,
    url,
    content,
  };
};
