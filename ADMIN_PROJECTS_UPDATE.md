# Admin Projects Panel Update

I've updated the backend to support the file system, but the admin UI needs to be implemented. Here's what needs to be added to `AdminDashboard.tsx`:

## Required Changes

### 1. Add imports at top:
```typescript
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';
import type { Project, ProjectFile } from '../../types';
```

### 2. Add state variables (after line ~68):
```typescript
// Projects
const [projects, setProjects] = useState<Project[]>([]);
const [editingProject, setEditingProject] = useState<Project | null>(null);
const [newProjectForm, setNewProjectForm] = useState({
  title: '',
  description: '',
  technologies: '',
  imageUrl: '',
  projectUrl: '',
  githubUrl: '',
  featured: false,
  additionalFiles: [] as ProjectFile[],
  order: 0,
});
const [newFile, setNewFile] = useState({
  name: '',
  type: 'link' as 'image' | 'pdf' | 'link' | 'certificate',
  url: '',
  content: '',
});
```

### 3. Add fetch function in `fetchAllData` (around line 100):
```typescript
const projectsData = await getProjects();
setProjects(projectsData.sort((a, b) => a.order - b.order));
```

### 4. Add handler functions (after other handlers):
```typescript
const handleCreateProject = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const projectData = {
      ...newProjectForm,
      technologies: newProjectForm.technologies.split(',').map(t => t.trim()).filter(Boolean),
      additionalFiles: newProjectForm.additionalFiles,
    };
    await createProject(projectData);
    setNewProjectForm({
      title: '',
      description: '',
      technologies: '',
      imageUrl: '',
      projectUrl: '',
      githubUrl: '',
      featured: false,
      additionalFiles: [],
      order: projects.length,
    });
    fetchAllData();
    alert('Project created successfully!');
  } catch (error) {
    console.error('Error creating project:', error);
    alert('Failed to create project');
  }
};

const handleUpdateProject = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingProject) return;
  try {
    const projectData = {
      ...editingProject,
      technologies: typeof editingProject.technologies === 'string'
        ? editingProject.technologies.split(',').map(t => t.trim()).filter(Boolean)
        : editingProject.technologies,
    };
    await updateProject(editingProject._id, projectData);
    setEditingProject(null);
    fetchAllData();
    alert('Project updated successfully!');
  } catch (error) {
    console.error('Error updating project:', error);
    alert('Failed to update project');
  }
};

const handleDeleteProject = async (id: string) => {
  if (!confirm('Are you sure you want to delete this project?')) return;
  try {
    await deleteProject(id);
    fetchAllData();
    alert('Project deleted successfully!');
  } catch (error) {
    console.error('Error deleting project:', error);
    alert('Failed to delete project');
  }
};

const handleAddFile = () => {
  const file: ProjectFile = {
    id: Date.now().toString(),
    name: newFile.name,
    type: newFile.type,
    url: newFile.url,
    content: newFile.content || undefined,
  };

  if (editingProject) {
    setEditingProject({
      ...editingProject,
      additionalFiles: [...editingProject.additionalFiles, file],
    });
  } else {
    setNewProjectForm({
      ...newProjectForm,
      additionalFiles: [...newProjectForm.additionalFiles, file],
    });
  }

  setNewFile({ name: '', type: 'link', url: '', content: '' });
};

const handleRemoveFile = (fileId: string) => {
  if (editingProject) {
    setEditingProject({
      ...editingProject,
      additionalFiles: editingProject.additionalFiles.filter(f => f.id !== fileId),
    });
  } else {
    setNewProjectForm({
      ...newProjectForm,
      additionalFiles: newProjectForm.additionalFiles.filter(f => f.id !== fileId),
    });
  }
};
```

### 5. Replace the Projects tab content (line 845-850):

Due to the length of the UI code, I'll create it in a separate file. Check `AdminProjectsTab.tsx` for the complete implementation.

## Next Steps

1. I'll create the complete Projects tab UI component
2. You'll import it into AdminDashboard
3. The admin panel will be fully functional for managing projects and files!
