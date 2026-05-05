import { Database } from './database.js';

const db = new Database();
await db.initialize();
console.log('✅ Database initialized successfully');
db.close();