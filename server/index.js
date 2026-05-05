import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Database } from './db/database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Initialize database
const db = new Database();
await db.initialize();

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route requests
  if (req.url === '/' && req.method === 'GET') {
    serveFile(res, '../public/index.html', 'text/html');
  } else if (req.url.startsWith('/api/')) {
    handleAPI(req, res, db);
  } else if (req.url.match(/\.(css|js|json)$/)) {
    const filePath = path.join(__dirname, '..', 'public', req.url);
    const ext = path.extname(req.url).slice(1);
    const mimeType = `text/${ext === 'js' ? 'javascript' : ext}`;
    serveFile(res, filePath, mimeType);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

function serveFile(res, filePath, mimeType) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(data);
    }
  });
}

function handleAPI(req, res, db) {
  res.setHeader('Content-Type', 'application/json');

  // API endpoints would go here
  // This is a placeholder
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'API endpoint', path: req.url }));
}

server.listen(PORT, () => {
  console.log(`\n🔬 ResearchDesk server running at http://localhost:${PORT}`);
  console.log(`📖 API documentation: http://localhost:${PORT}/docs`);
  console.log(`\nPress Ctrl+C to stop the server\n`);
});

process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down ResearchDesk server...');
  db.close();
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});