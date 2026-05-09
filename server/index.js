import http from 'http';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import { Database } from './db/database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const db = new Database();
await db.initialize();

// ── Helpers ──

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function json(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function serveFile(res, filePath, mimeType = 'text/html') {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      json(res, 404, { error: 'File not found' });
    } else {
      res.writeHead(200, {
        'Content-Type': mimeType || 'text/html'
      });

      res.end(data);
    }
  });
}

// ── Server ──

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlPath = req.url.split('?')[0];

  try {
    await route(req, res, urlPath);
  } catch (err) {
    console.error('Request error:', err);
    json(res, 500, { error: 'Internal server error' });
  }
});

async function route(req, res, urlPath) {
  const { method } = req;

  // ── Static pages ──

  if (urlPath === '/' && method === 'GET') {
    return serveFile(
      res,
      path.join(__dirname, '..', 'public', 'index.html'),
      'text/html'
    );
  }

  if (urlPath === '/manuscripts.html' && method === 'GET') {
    return serveFile(
      res,
      path.join(__dirname, '..', 'public', 'manuscripts.html'),
      'text/html'
    );
  }

  if (urlPath === '/dashboard.html' && method === 'GET') {
    return serveFile(
      res,
      path.join(__dirname, '..', 'public', 'dashboard.html'),
      'text/html'
    );
  }

  // ── Static assets ──

  if (/\.(css|js|json|webmanifest)$/.test(urlPath)) {
    const ext = path.extname(urlPath).slice(1);

    const mime = {
      css: 'text/css',
      js: 'text/javascript',
      json: 'application/json',
      webmanifest: 'application/manifest+json',
    }[ext] || 'text/plain';

    return serveFile(
      res,
      path.join(__dirname, '..', 'public', urlPath),
      mime
    );
  }

  // ── API: Projects ──

  if (urlPath === '/api/projects' && method === 'GET') {
    const projects = db.all(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );

    return json(res, 200, projects);
  }

  if (urlPath === '/api/projects' && method === 'POST') {
    const body = await readBody(req);

    const { title, type, description } = body;

    if (!title || !type) {
      return json(res, 400, {
        error: 'title and type are required'
      });
    }

    const id = randomUUID();

    db.run(
      'INSERT INTO projects (id, title, type, description) VALUES (?, ?, ?, ?)',
      [id, title, type, description || '']
    );

    const project = db.get(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    return json(res, 201, project);
  }

  const projectMatch = urlPath.match(/^\/api\/projects\/([^/]+)$/);

  if (projectMatch) {
    const id = projectMatch[1];

    if (method === 'GET') {
      const project = db.get(
        'SELECT * FROM projects WHERE id = ?',
        [id]
      );

      if (!project) {
        return json(res, 404, { error: 'Not found' });
      }

      return json(res, 200, project);
    }

    if (method === 'PUT') {
      const body = await readBody(req);

      const {
        title,
        type,
        description,
        status
      } = body;

      db.run(
        `UPDATE projects SET
          title = COALESCE(?, title),
          type = COALESCE(?, type),
          description = COALESCE(?, description),
          status = COALESCE(?, status),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [title, type, description, status, id]
      );

      const project = db.get(
        'SELECT * FROM projects WHERE id = ?',
        [id]
      );

      if (!project) {
        return json(res, 404, { error: 'Not found' });
      }

      return json(res, 200, project);
    }

    if (method === 'DELETE') {
      const project = db.get(
        'SELECT id FROM projects WHERE id = ?',
        [id]
      );

      if (!project) {
        return json(res, 404, { error: 'Not found' });
      }

      db.run(
        'DELETE FROM manuscripts WHERE project_id = ?',
        [id]
      );

      db.run(
        'DELETE FROM refs WHERE project_id = ?',
        [id]
      );

      db.run(
        'DELETE FROM projects WHERE id = ?',
        [id]
      );

      return json(res, 200, { deleted: id });
    }
  }

  return json(res, 404, { error: 'Not found' });
}
server.listen(PORT, () => {
  console.log(`\n🔬 ResearchDesk running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop\n');
});
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down...');

  server.close(() => {
    db.close();
    process.exit(0);
  });
});