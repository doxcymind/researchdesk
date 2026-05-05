# ResearchDesk

**ResearchDesk** is an open-source research management platform that guides you through the complete lifecycle of academic research projects—from case reports and review articles to original studies and dissertations.

Built with vanilla JavaScript, Node.js, and SQLite, enhanced with AI-powered writing assistance via OpenAI API.

## Features

### Project Management
- **Multi-project workspace** - Manage case reports, review articles, original studies, and dissertations
- **Collaborative tracking** - Track project setup, collaborators, and team assignments
- **Compliance & ethics** - Built-in fields for ethics approvals, regulatory details, and institutional requirements

### Research Workflow
- **Literature review management** - Organize and annotate research sources
- **Study planning** - Design methodology, hypotheses, and study parameters
- **Smart note-taking** - Capture research insights, quotes, and analysis
- **Reference management** - Maintain citations and bibliographic data

### AI-Assisted Writing
- **Policy-aware drafting** - AI suggestions shaped around journal-safe guardrails
- **Manuscript assistance** - Generate drafts, outlines, and section templates
- **Intelligent editing** - AI-powered suggestions for clarity, structure, and tone
- **Submission prep** - Prepare abstracts, keywords, and cover letters

### Built-In Guardrails
- Research integrity checks
- Compliance tracking
- Ethical guidelines enforcement
- Journal policy alignment

## Quick Start

### Prerequisites
- Node.js 14+ 
- SQLite3
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone the repository
git clone https://github.com/doxcymind/researchdesk.git
cd researchdesk

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key

# Initialize the database
npm run db:init

# Start the development server
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
researchdesk/
├── public/              # Static assets (CSS, client-side JS)
├── server/              # Node.js backend
│   ├── routes/          # API endpoints
│   ├── db/              # Database schema and queries
│   ├── middleware/      # Authentication, validation
│   └── services/        # Business logic
├── database/            # SQLite database files
├── docs/                # Documentation and guides
├── .env.example         # Environment variables template
├── package.json         # Dependencies
└── README.md            # This file
```

## Architecture

### Frontend
- Vanilla HTML5, CSS3, and JavaScript
- Responsive design
- Real-time form validation
- Local state management

### Backend
- Node.js with native HTTP server
- RESTful API endpoints
- Request validation and sanitization
- OpenAI API integration

### Database
- SQLite for data persistence
- Structured schema for research projects
- Support for complex workflows

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server
NODE_ENV=development
PORT=3000

# OpenAI API
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4

# Database
DB_PATH=./database/researchdesk.db

# Security
SESSION_SECRET=your_session_secret_here
```

## Usage

### Creating a Research Project

1. **Start a new project** - Choose your research type (case report, review, study, dissertation)
2. **Set up basics** - Add title, description, and team members
3. **Configure compliance** - Add ethics approvals and regulatory requirements
4. **Build your workflow** - Add literature review, study plan, and notes
5. **Draft with AI** - Use AI assistance to generate and refine your manuscript

### Using AI Features

ResearchDesk integrates OpenAI to provide:
- **Manuscript drafting** - Generate sections based on your research notes
- **Editing assistance** - Get suggestions for clarity and structure
- **Formatting help** - Ensure compliance with journal guidelines

## API Documentation

See [API_DOCS.md](./docs/API_DOCS.md) for detailed endpoint documentation.

## Development

### Running Tests

```bash
npm test
```

### Development Mode

```bash
npm run dev
```

Runs with automatic restart on file changes.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Areas We Need Help With

- PDF text extraction and analysis
- Direct PubMed/academic database integration
- Enhanced reference management
- Evidence synthesis automation
- Multi-user collaboration features
- Deployment & DevOps
- UI/UX improvements
- Documentation

## Roadmap

### Coming Soon
- [ ] Direct PubMed search integration
- [ ] PDF upload and analysis
- [ ] Real-time collaborative editing
- [ ] Advanced evidence synthesis
- [ ] Journal submission API integration
- [ ] Citation import from external databases
- [ ] Research version control
- [ ] Institutional deployment support

## License

MIT License - see [LICENSE](LICENSE) for details.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.

## Support

- **Issues** - Found a bug? [Report it here](https://github.com/doxcymind/researchdesk/issues)
- **Discussions** - Have questions? [Start a discussion](https://github.com/doxcymind/researchdesk/discussions)
- **Documentation** - See [docs/](docs/) for guides and tutorials

## Citation

If you use ResearchDesk in your research, please cite:

```bibtex
@software{researchdesk2026,
  title={ResearchDesk: AI-Assisted Research Management Platform},
  author={Your Name},
  url={https://github.com/doxcymind/researchdesk},
  year={2026}
}
```

## Acknowledgments

- Built with Node.js and SQLite
- AI capabilities powered by OpenAI
- Inspired by the needs of modern research teams

---

**ResearchDesk** - Making research management smarter, simpler, and more collaborative.