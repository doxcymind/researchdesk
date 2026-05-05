import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Database {
  constructor() {
    const dbDir = path.join(__dirname, '../../database');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    const dbPath = process.env.DB_PATH || path.join(dbDir, 'researchdesk.db');
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
  }

  async initialize() {
    // Create tables
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS manuscripts (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        content TEXT,
        version INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );

      CREATE TABLE IF NOT EXISTS references (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        title TEXT,
        authors TEXT,
        url TEXT,
        doi TEXT,
        year INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
    `);
  }

  run(query, params = []) {
    return this.db.prepare(query).run(...params);
  }

  get(query, params = []) {
    return this.db.prepare(query).get(...params);
  }

  all(query, params = []) {
    return this.db.prepare(query).all(...params);
  }

  close() {
    this.db.close();
  }
}