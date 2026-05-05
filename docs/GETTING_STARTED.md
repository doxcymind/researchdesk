# Getting Started with ResearchDesk

## First Run

After [installing ResearchDesk](./INSTALLATION.md), follow these steps to get started:

### 1. Start the Server

```bash
npm start
```

You should see:
```
ResearchDesk server running at http://localhost:3000
```

### 2. Open in Your Browser

Navigate to `http://localhost:3000` in your web browser.

### 3. Create Your First Project

On the home page, click **"New Project"** and select your research type:

- **Case Report** - Document a single patient/subject case
- **Review Article** - Conduct a literature or systematic review
- **Original Study** - Plan and track an original research study
- **Dissertation/Thesis** - Manage your thesis or dissertation work

### 4. Fill in Project Details

Enter:
- **Project title**
- **Description**
- **Lead researcher**
- **Target journal or institution** (optional)

### 5. Add Team Members

- Invite collaborators
- Assign roles (lead, contributor, reviewer)
- Set permissions

### 6. Configure Compliance Settings

If needed, add:
- **Ethics approval number**
- **IRB/REC reference**
- **Regulatory requirements**
- **Confidentiality agreements**

## Core Workflows

### Literature Review

1. Go to the **Literature** section
2. Add sources (URLs, DOIs, PDFs)
3. Write summaries and notes
4. Tag with keywords for easy reference
5. Use AI assistance to generate summaries

### Study Planning

1. Navigate to **Study Design**
2. Define:
   - Research questions
   - Hypotheses
   - Study type and design
   - Sample size calculations
   - Inclusion/exclusion criteria
3. Track regulatory compliance

### Manuscript Drafting

1. Go to **Manuscript**
2. Choose your manuscript type and structure
3. Use AI assistance for:
   - **Section generation** - Get draft text for methods, results, discussion
   - **Editing** - Request suggestions for clarity and flow
   - **Formatting** - Ensure journal compliance
4. Manually refine AI-generated content
5. Track revisions and versions

### Collaboration

1. Share your project with team members
2. Assign tasks and sections
3. Leave comments and suggestions
4. View activity timeline
5. Merge edits and track changes

## Using AI Features

### Ask AI for Help

Throughout ResearchDesk, click the **"✨ AI Assistant"** button to:

**Generate Sections**
```
Ask: "Generate methods section for a randomized controlled trial"
AI will use your study design and create a draft
```

**Improve Writing**
```
Select text → Click "Improve Writing"
AI will suggest improvements for clarity, tone, and structure
```

**Check Compliance**
```
Click "Check Compliance"
AI will verify your manuscript against journal guidelines
```

### Important Notes on AI

- **Always review** AI-generated content before using it
- **Personalize** suggestions to your specific research
- **Check facts** - AI may make mistakes
- **Maintain integrity** - AI is a writing assistant, not a replacement for your research
- **Follow guidelines** - Ensure your journal allows AI assistance in manuscript preparation

## Tips & Tricks

### Keyboard Shortcuts

- `Ctrl+S` / `Cmd+S` - Save current section
- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Y` / `Cmd+Y` - Redo
- `/` - Open command palette

### Templates

ResearchDesk includes templates for:
- Common manuscript sections
- Study protocols
- Literature review outlines
- Ethics applications

Access them in **Settings** → **Templates**

### Import/Export

- **Export** your project as:
  - Markdown
  - PDF (formatted)
  - Word (.docx)
  - Plain text
- **Import** from:
  - External documents
  - Previous ResearchDesk projects

### Team Settings

- Control access permissions
- Set notification preferences
- Manage API keys (if using external integrations)
- Configure audit logging

## Common Tasks

### Add a Citation

1. In **Literature** section, click **"Add Source"**
2. Enter URL or DOI
3. ResearchDesk will fetch metadata
4. Add your notes and tags
5. Use in-text citations in manuscript

### Create a New Manuscript Version

1. In **Manuscript**, click **"Create Version"**
2. Give it a name (e.g., "v2 - Reviewer feedback")
3. Changes create a new checkpoint
4. Compare versions and track changes

### Request AI Feedback

1. Select manuscript text
2. Click **"Ask AI"**
3. Choose feedback type:
   - Clarity
   - Accuracy
   - Style
   - Compliance
4. Review suggestions and apply selectively

## Next Steps

- **Read the API documentation** - [API_DOCS.md](./API_DOCS.md)
- **Explore advanced features** - [ADVANCED_GUIDE.md](./ADVANCED_GUIDE.md)
- **Join our community** - [GitHub Discussions](https://github.com/doxcymind/researchdesk/discussions)
- **Report issues** - [GitHub Issues](https://github.com/doxcymind/researchdesk/issues)

## Need Help?

- 📖 Check [documentation](./)
- 💬 Ask in [Discussions](https://github.com/doxcymind/researchdesk/discussions)
- 🐛 Report bugs in [Issues](https://github.com/doxcymind/researchdesk/issues)
- 📧 Email support (coming soon)