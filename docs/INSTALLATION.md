# Installation Guide

## System Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **SQLite3**: Usually included with Node.js
- **OpenAI API Key**: [Get one here](https://platform.openai.com/api-keys)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/doxcymind/researchdesk.git
cd researchdesk
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `openai` - OpenAI API client
- `better-sqlite3` - Database driver
- `dotenv` - Environment variable management

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Required
OPENAI_API_KEY=sk-...

# Optional (defaults will be used if not set)
NODE_ENV=development
PORT=3000
DB_PATH=./database/researchdesk.db
```

### 4. Initialize the Database

```bash
npm run db:init
```

This will:
- Create the `database/` directory if it doesn't exist
- Initialize the SQLite database
- Create all necessary tables and schemas

### 5. Start the Development Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Troubleshooting

### Node.js Not Found

**Problem**: `command not found: node`

**Solution**: 
- Install Node.js from https://nodejs.org/
- Verify installation: `node --version`

### npm Install Fails

**Problem**: Permission denied or build errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# On macOS/Linux, you might need sudo for global packages
# (not recommended for dev dependencies)
```

### Database Initialization Fails

**Problem**: `Cannot create database directory` or permission errors

**Solution**:
```bash
# Create directory manually
mkdir -p database

# Try initialization again
npm run db:init
```

### OpenAI API Key Issues

**Problem**: "Invalid API Key" or authentication errors

**Solution**:
1. Check your `.env` file has the correct API key
2. Get a new key from https://platform.openai.com/api-keys
3. Ensure the key starts with `sk-`
4. Check your OpenAI account has billing enabled

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Change the port in .env
echo "PORT=3001" >> .env

# Or kill the process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Next Steps

After successful installation:

1. **Read the Quick Start Guide** - See [README.md](../README.md#quick-start)
2. **Create Your First Project** - Start exploring ResearchDesk
3. **Check API Documentation** - See [API_DOCS.md](./API_DOCS.md)
4. **Join Our Community** - Open a [Discussion](https://github.com/doxcymind/researchdesk/discussions)

## Getting Help

If you encounter issues:

1. **Check existing issues** - https://github.com/doxcymind/researchdesk/issues
2. **Start a discussion** - https://github.com/doxcymind/researchdesk/discussions
3. **Read documentation** - Check the [docs/](.) folder
4. **Report a bug** - [Open an issue](https://github.com/doxcymind/researchdesk/issues/new)