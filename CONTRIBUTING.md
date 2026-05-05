# Contributing to ResearchDesk

First off, thank you for considering contributing to ResearchDesk! It's researchers and developers like you that make ResearchDesk such a great platform.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [issue list](https://github.com/doxcymind/researchdesk/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate those steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if possible**
- **Include your environment** (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/doxcymind/researchdesk/issues). When creating an enhancement suggestion, please include:

- **A clear and descriptive title**
- **A step-by-step description of the suggested enhancement**
- **Specific examples to demonstrate the steps**
- **A description of the current behavior and expected behavior**
- **An explanation of why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Follow the JavaScript/Node.js styleguides
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline

## Development Setup

1. Fork and clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/researchdesk.git
cd researchdesk
```

2. Install dependencies

```bash
npm install
```

3. Create a new branch for your feature or bugfix

```bash
git checkout -b feature/your-feature-name
```

4. Set up your environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Make your changes and test

```bash
npm run dev
```

6. Commit with clear messages

```bash
git commit -m "Add feature: description"
```

7. Push to your fork and submit a pull request

## Styleguides

### JavaScript/Node.js

- Use 2-space indentation
- Use `const` by default, `let` when you need to reassign
- Avoid `var`
- Use arrow functions when appropriate
- Write descriptive variable and function names
- Add comments for complex logic

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Documentation

- Use Markdown for all documentation
- Keep examples clear and simple
- Update the README if you change functionality
- Add JSDoc comments to new functions

## Priority Areas for Contribution

We'd especially love help with:

1. **Database Integration**
   - PubMed/academic database API integration
   - Advanced search capabilities

2. **Backend Features**
   - Enhanced AI prompt engineering
   - Real-time collaboration
   - User authentication improvements

3. **Frontend Improvements**
   - UI/UX enhancements
   - Mobile responsiveness
   - Accessibility improvements

4. **Documentation**
   - API documentation
   - User guides
   - Tutorial videos

5. **Testing**
   - Unit tests
   - Integration tests
   - End-to-end tests

## Questions?

Feel free to open a [GitHub Discussion](https://github.com/doxcymind/researchdesk/discussions) or reach out via email.

Happy contributing! 🎉