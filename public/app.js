// ResearchDesk Frontend Application

const API_BASE = '/api';

class ResearchDesk {
  constructor() {
    this.projects = [];
    this.currentProject = null;
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadProjects();
  }

  setupEventListeners() {
    const newProjectBtn = document.getElementById('newProject');
    if (newProjectBtn) {
      newProjectBtn.addEventListener('click', () => this.showNewProjectDialog());
    }
  }

  async loadProjects() {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      if (response.ok) {
        this.projects = await response.json();
        this.renderProjects();
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  }

  renderProjects() {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;

    if (this.projects.length === 0) {
      projectsList.innerHTML = '<p class="empty-state">No projects yet. Create one to get started!</p>';
      return;
    }

    projectsList.innerHTML = this.projects
      .map(project => `
        <div class="project-card" onclick="researchDesk.openProject('${project.id}')">
          <h4>${project.title}</h4>
          <p>${project.description || ''}</p>
          <span class="project-type">${project.type}</span>
        </div>
      `)
      .join('');
  }

  showNewProjectDialog() {
    const projectType = prompt('Project type (case-report, review, study, dissertation):');
    if (!projectType) return;

    const title = prompt('Project title:');
    if (!title) return;

    const description = prompt('Description (optional):');
    this.createProject({ title, description, type: projectType });
  }

  async createProject(data) {
    try {
      const response = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await this.loadProjects();
        alert('Project created successfully!');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project');
    }
  }

  openProject(projectId) {
    console.log('Opening project:', projectId);
    // Navigate to project detail page
    window.location.href = `/project/${projectId}`;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.researchDesk = new ResearchDesk();
});