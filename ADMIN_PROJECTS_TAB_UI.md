# Projects Tab UI - Complete JSX

Replace the Projects tab section (lines 844-850) with this complete implementation:

```tsx
        {/* Projects & Education Tab */}
        {activeTab === 'projects' && (
          <div className="card">
            <h2 className="card-title">Projects & Education</h2>

            {/* Create New Project Form */}
            {!editingProject && (
              <div className="form-section">
                <h3 className="section-subtitle">Create New Project</h3>
                <form onSubmit={handleCreateProject} className="form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Project Title *</label>
                      <input
                        type="text"
                        value={newProjectForm.title}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Order</label>
                      <input
                        type="number"
                        value={newProjectForm.order}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, order: parseInt(e.target.value) })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      value={newProjectForm.description}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                      className="form-textarea"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={newProjectForm.technologies}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, technologies: e.target.value })}
                        className="form-input"
                        placeholder="React, TypeScript, Node.js"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Screenshot URL</label>
                      <input
                        type="url"
                        value={newProjectForm.imageUrl}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, imageUrl: e.target.value })}
                        className="form-input"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Live Demo URL</label>
                      <input
                        type="url"
                        value={newProjectForm.projectUrl}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, projectUrl: e.target.value })}
                        className="form-input"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">GitHub URL</label>
                      <input
                        type="url"
                        value={newProjectForm.githubUrl}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, githubUrl: e.target.value })}
                        className="form-input"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newProjectForm.featured}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, featured: e.target.checked })}
                      />
                      Featured Project
                    </label>
                  </div>

                  {/* Additional Files Section */}
                  <div className="files-section">
                    <h4 className="section-subtitle">Additional Files (Certificates, PDFs, etc.)</h4>

                    {newProjectForm.additionalFiles.length > 0 && (
                      <div className="files-list">
                        {newProjectForm.additionalFiles.map((file) => (
                          <div key={file.id} className="file-item">
                            <div className="file-info">
                              <span className="file-type-badge">{file.type}</span>
                              <span className="file-name">{file.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(file.id)}
                              className="btn-delete-small"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="add-file-form">
                      <div className="form-row">
                        <div className="form-group">
                          <input
                            type="text"
                            value={newFile.name}
                            onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                            className="form-input"
                            placeholder="File name (e.g., AWS Certificate.pdf)"
                          />
                        </div>
                        <div className="form-group">
                          <select
                            value={newFile.type}
                            onChange={(e) => setNewFile({ ...newFile, type: e.target.value as any })}
                            className="form-select"
                          >
                            <option value="link">Link</option>
                            <option value="image">Image</option>
                            <option value="pdf">PDF</option>
                            <option value="certificate">Certificate</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="url"
                          value={newFile.url}
                          onChange={(e) => setNewFile({ ...newFile, url: e.target.value })}
                          className="form-input"
                          placeholder="File URL"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          value={newFile.content}
                          onChange={(e) => setNewFile({ ...newFile, content: e.target.value })}
                          className="form-textarea"
                          rows={2}
                          placeholder="Description (optional)"
                        />
                      </div>
                      <button type="button" onClick={handleAddFile} className="btn-secondary">
                        Add File
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">Create Project</button>
                </form>
              </div>
            )}

            {/* Edit Project Form */}
            {editingProject && (
              <div className="form-section">
                <h3 className="section-subtitle">Edit Project: {editingProject.title}</h3>
                <form onSubmit={handleUpdateProject} className="form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Project Title *</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Order</label>
                      <input
                        type="number"
                        value={editingProject.order}
                        onChange={(e) => setEditingProject({ ...editingProject, order: parseInt(e.target.value) })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="form-textarea"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={typeof editingProject.technologies === 'string' ? editingProject.technologies : editingProject.technologies.join(', ')}
                        onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value } as any)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Screenshot URL</label>
                      <input
                        type="url"
                        value={editingProject.imageUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Live Demo URL</label>
                      <input
                        type="url"
                        value={editingProject.projectUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, projectUrl: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">GitHub URL</label>
                      <input
                        type="url"
                        value={editingProject.githubUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={editingProject.featured}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                      />
                      Featured Project
                    </label>
                  </div>

                  {/* Additional Files Section */}
                  <div className="files-section">
                    <h4 className="section-subtitle">Additional Files</h4>

                    {(editingProject.additionalFiles || []).length > 0 && (
                      <div className="files-list">
                        {editingProject.additionalFiles.map((file) => (
                          <div key={file.id} className="file-item">
                            <div className="file-info">
                              <span className="file-type-badge">{file.type}</span>
                              <span className="file-name">{file.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(file.id)}
                              className="btn-delete-small"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="add-file-form">
                      <div className="form-row">
                        <div className="form-group">
                          <input
                            type="text"
                            value={newFile.name}
                            onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                            className="form-input"
                            placeholder="File name"
                          />
                        </div>
                        <div className="form-group">
                          <select
                            value={newFile.type}
                            onChange={(e) => setNewFile({ ...newFile, type: e.target.value as any })}
                            className="form-select"
                          >
                            <option value="link">Link</option>
                            <option value="image">Image</option>
                            <option value="pdf">PDF</option>
                            <option value="certificate">Certificate</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="url"
                          value={newFile.url}
                          onChange={(e) => setNewFile({ ...newFile, url: e.target.value })}
                          className="form-input"
                          placeholder="File URL"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          value={newFile.content}
                          onChange={(e) => setNewFile({ ...newFile, content: e.target.value })}
                          className="form-textarea"
                          rows={2}
                          placeholder="Description"
                        />
                      </div>
                      <button type="button" onClick={handleAddFile} className="btn-secondary">
                        Add File
                      </button>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Update Project</button>
                    <button type="button" onClick={handleCancelEditProject} className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Projects List */}
            <div className="list-section">
              <h3 className="section-subtitle">Existing Projects ({projects.length})</h3>
              {projects.length === 0 ? (
                <p className="empty-state">No projects yet. Create your first project above!</p>
              ) : (
                <div className="items-grid">
                  {projects.map((project) => (
                    <div key={project._id} className="item-card">
                      <div className="item-header">
                        <h4 className="item-title">{project.title}</h4>
                        {project.featured && <span className="badge-featured">Featured</span>}
                      </div>
                      <p className="item-description">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="tech-tags">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                      {project.additionalFiles && project.additionalFiles.length > 0 && (
                        <div className="files-count">
                          📁 {project.additionalFiles.length} additional file{project.additionalFiles.length !== 1 ? 's' : ''}
                        </div>
                      )}
                      <div className="item-actions">
                        <button
                          onClick={() => handleStartEditProject(project)}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
```

## CSS Additions

Add these styles to `AdminDashboard.css`:

```css
/* Files Section */
.files-section {
  margin-top: 24px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.files-list {
  margin-bottom: 16px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 8px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-type-badge {
  background-color: var(--color-tertiary);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.file-name {
  font-weight: 500;
}

.add-file-form {
  margin-top: 16px;
  padding: 16px;
  background-color: white;
  border: 2px dashed #ddd;
  border-radius: 8px;
}

.btn-delete-small {
  padding: 6px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-delete-small:hover {
  background-color: #d32f2f;
}

/* Tech Tags */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}

.tech-tag {
  padding: 4px 12px;
  background-color: var(--color-secondary);
  color: var(--color-text);
  border-radius: 12px;
  font-size: 12px;
  border: 1px solid var(--color-text);
}

.files-count {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.badge-featured {
  background-color: var(--color-primary);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.item-card {
  padding: 16px;
  background-color: white;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-title {
  margin: 0;
  font-size: 18px;
  color: var(--color-text);
}

.item-description {
  margin: 12px 0;
  color: #666;
  line-height: 1.5;
}

.item-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.btn-edit,
.btn-delete {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.btn-edit {
  background-color: var(--color-tertiary);
  color: white;
}

.btn-edit:hover {
  opacity: 0.9;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #d32f2f;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Squada One', sans-serif;
  font-size: 16px;
  color: var(--color-text);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
```

Now your admin panel will be fully functional for managing projects with files!
