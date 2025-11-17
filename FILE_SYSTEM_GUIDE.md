# Projects File System Guide

The Projects & Education section now works like an actual computer file system! You can browse folders, view files, and organize your projects, certificates, and other documents.

## How It Works

### Automatic Project Folders

Every project in your database is automatically converted into a folder containing:
- **README.txt** - Project description with link to live demo or GitHub
- **screenshot.png** - Project image (if provided)
- **source-code.link** - Link to GitHub repository (if provided)
- **live-demo.link** - Link to live project (if provided)
- **technologies.txt** - List of technologies used

### Adding Certificates

To add certificates or other standalone files, edit `client/src/components/sections/ProjectsSection.tsx`:

```typescript
const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const fileSystemItems: FileItem[] = projects.map(convertProjectToFileItem);

  // Add certificates
  fileSystemItems.push({
    id: 'cert-aws',
    name: 'AWS Certificate.pdf',
    type: 'certificate',
    content: 'AWS Certified Developer - Associate\n\nIssued: January 2025',
    url: '/certificates/aws-cert.pdf'
  });

  fileSystemItems.push({
    id: 'cert-react',
    name: 'React Certification.pdf',
    type: 'certificate',
    content: 'Advanced React Development',
    url: '/certificates/react-cert.pdf'
  });

  // ... rest of component
}
```

### Creating Custom Folders

You can create custom folders with nested content:

```typescript
fileSystemItems.push({
  id: 'education',
  name: 'Education',
  type: 'folder',
  items: [
    {
      id: 'degree',
      name: 'Bachelors Degree.pdf',
      type: 'certificate',
      content: 'Computer Science, University Name\nGraduated: 2023',
      url: '/education/degree.pdf'
    },
    {
      id: 'transcript',
      name: 'Transcript.pdf',
      type: 'pdf',
      content: 'Official academic transcript',
      url: '/education/transcript.pdf'
    }
  ]
});
```

### File Types

#### Folder
```typescript
{
  id: 'unique-id',
  name: 'Folder Name',
  type: 'folder',
  items: [ /* array of FileItems */ ]
}
```

#### Certificate/PDF
```typescript
{
  id: 'unique-id',
  name: 'Certificate.pdf',
  type: 'certificate', // or 'pdf'
  content: 'Description text',
  url: '/path/to/certificate.pdf'
}
```

#### Image
```typescript
{
  id: 'unique-id',
  name: 'photo.png',
  type: 'image',
  url: '/path/to/image.png',
  content: 'Optional caption'
}
```

#### Link
```typescript
{
  id: 'unique-id',
  name: 'website.link',
  type: 'link',
  content: 'Description of the link',
  url: 'https://example.com'
}
```

## Features

- **Navigation**: Click folders to open them, use Back button to go up
- **Home Button**: Quickly return to root directory
- **File Viewers**: Different viewers for PDFs, images, and links
- **Responsive**: Works great on mobile and desktop
- **Retro Aesthetic**: Matches your portfolio's design style

## Example: Complete Setup

```typescript
const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const fileSystemItems: FileItem[] = projects.map(convertProjectToFileItem);

  // Add Education folder
  fileSystemItems.push({
    id: 'education',
    name: 'Education',
    type: 'folder',
    items: [
      {
        id: 'bachelor',
        name: 'BS Computer Science.pdf',
        type: 'certificate',
        content: 'Bachelor of Science in Computer Science\nStanford University\nGraduated: May 2023\nGPA: 3.8/4.0',
        url: '/education/bachelor-degree.pdf'
      },
      {
        id: 'coursework',
        name: 'Relevant Coursework.txt',
        type: 'link',
        content: 'Key Courses:\n• Data Structures & Algorithms\n• Web Development\n• Database Systems\n• Machine Learning\n• Software Engineering'
      }
    ]
  });

  // Add Certificates folder
  fileSystemItems.push({
    id: 'certifications',
    name: 'Certifications',
    type: 'folder',
    items: [
      {
        id: 'aws',
        name: 'AWS Developer.pdf',
        type: 'certificate',
        content: 'AWS Certified Developer - Associate\nIssued: Jan 2025',
        url: '/certificates/aws.pdf'
      },
      {
        id: 'docker',
        name: 'Docker Certified.pdf',
        type: 'certificate',
        content: 'Docker Certified Associate\nIssued: Dec 2024',
        url: '/certificates/docker.pdf'
      }
    ]
  });

  // Add resume
  fileSystemItems.push({
    id: 'resume',
    name: 'Resume.pdf',
    type: 'pdf',
    content: 'Download my current resume',
    url: '/resume.pdf'
  });

  return (
    // ... rest of component
  );
};
```

## Tips

1. **File Placement**: Place PDF files in `client/public/certificates/` or `client/public/education/`
2. **Unique IDs**: Make sure each item has a unique ID
3. **Nested Folders**: You can nest folders as deep as you want
4. **Icons**: Different file types automatically get different icons
5. **Mobile**: The grid adapts to smaller screens automatically
