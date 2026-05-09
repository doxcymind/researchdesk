const API_BASE = '/api';

class ResearchDesk {
  constructor() {
    this.projects = [];
    this.init();
  }

  async init() {
    this.setupEventListeners();
    this.startClock();
    await this.loadProjects();
  }

  // ── Clock ──

  startClock() {
    const bar = document.getElementById('statusBar');
    if (!bar) return;
    const tick = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      bar.innerHTML = `🟢 &nbsp;${date} &nbsp;·&nbsp; ${time}`;
    };
    tick();
    setInterval(tick, 1000);
  }

  // ── Event Listeners ──

  setupEventListeners() {
    // Open modal buttons
    document.getElementById('newProject')?.addEventListener('click', () => this.openModal());
    document.getElementById('newProject2')?.addEventListener('click', () => this.openModal());

    // Close modal buttons
    document.getElementById('closeModal')?.addEventListener('click', () => this.closeModal());
    document.getElementById('cancelProject')?.addEventListener('click', () => this.closeModal());

    // Close modal on overlay click
    document.getElementById('newProjectModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'newProjectModal') this.closeModal();
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });

    // Form submit
    document.getElementById('newProjectForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleCreateProject();
    });

    // Smooth scroll for Projects nav link
    document.querySelector('a[href="#projects-section"]')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── Modal ──

  openModal() {
    document.getElementById('newProjectForm').reset();
    document.getElementById('newProjectModal').classList.remove('hidden');
    setTimeout(() => document.getElementById('projectTitle')?.focus(), 50);
  }

  closeModal() {
    document.getElementById('newProjectModal').classList.add('hidden');
  }

  // ── Projects ──

  async loadProjects() {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) {
        this.projects = await res.json();
        this.renderProjects();
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  }

  renderProjects() {
    const list = document.getElementById('projectsList');
    if (!list) return;

    if (this.projects.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📁</div>
          <p>No projects yet. Click <strong>+ New Project</strong> to get started.</p>
        </div>`;
      return;
    }

    list.innerHTML = this.projects.map(p => `
      <div class="project-card" onclick="app.openProject('${p.id}')">
        <button class="btn-danger project-delete"
          onclick="event.stopPropagation(); app.deleteProject('${p.id}')"
          title="Delete project">✕</button>
        <h4>${this.escape(p.title)}</h4>
        <p>${this.escape(p.description || '')}</p>
        <div class="project-card-footer">
          <span class="project-type">${this.escape(p.type)}</span>
        </div>
      </div>`).join('');
  }

  async handleCreateProject() {
    const title = document.getElementById('projectTitle').value.trim();
    const type  = document.getElementById('projectType').value;
    const desc  = document.getElementById('projectDesc').value.trim();

    if (!title) return;

    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type, description: desc }),
      });

      if (res.ok) {
        this.closeModal();
        await this.loadProjects();
        document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
        this.toast('Project created!', 'success');
      } else {
        this.toast('Failed to create project', 'error');
      }
    } catch (err) {
      console.error(err);
      this.toast('Server error', 'error');
    }
  }

  async deleteProject(id) {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await this.loadProjects();
        this.toast('Project deleted', 'success');
      }
    } catch (err) {
      console.error(err);
    }
  }

  openProject(id) {
    window.location.href = `/project.html?id=${id}`;
  }

  // ── Helpers ──

  escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  toast(msg, type = '') {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = `toast ${type}`;
    setTimeout(() => { el.className = 'toast hidden'; }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new ResearchDesk();
});
