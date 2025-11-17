# Complete Admin Projects Implementation Guide

I've already updated:
- ✅ Backend Project model (supports additional files)
- ✅ Frontend types (Project and ProjectFile interfaces)
- ✅ Admin imports (added project API functions)
- ✅ Admin state variables (projects, editingProject, forms)

## Remaining Steps

### Step 1: Add Projects Fetch in `fetchAllData()`

Find the `fetchAllData` function (around line 115) and add this before the `finally` block:

```typescript
const projectsData = await getProjects();
setProjects(projectsData.sort((a, b) => a.order - b.order));
```

### Step 2: Add Handler Functions

Add these functions after the `handleDeleteSkill` function (around line 250):

```typescript
// Project Handlers
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
        ? (editingProject.technologies as string).split(',').map(t => t.trim()).filter(Boolean)
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

const handleStartEditProject = (project: Project) => {
  setEditingProject({
    ...project,
    technologies: project.technologies.join(', '),
  } as any);
};

const handleCancelEditProject = () => {
  setEditingProject(null);
};

// File management handlers
const handleAddFile = () => {
  if (!newFile.name || !newFile.url) {
    alert('Please provide file name and URL');
    return;
  }

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
      additionalFiles: [...(editingProject.additionalFiles || []), file],
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
      additionalFiles: (editingProject.additionalFiles || []).filter(f => f.id !== fileId),
    });
  } else {
    setNewProjectForm({
      ...newProjectForm,
      additionalFiles: newProjectForm.additionalFiles.filter(f => f.id !== fileId),
    });
  }
};
```

### Step 3: Replace the Projects Tab Content

Find line 845-850 where it says `{activeTab === 'projects' && (` and replace the entire section with the complete UI in the next file.

## Next File

Check `ADMIN_PROJECTS_TAB_UI.md` for the complete Projects tab JSX to paste in.
