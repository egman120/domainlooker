# Release Process

This document outlines the release process for DOMAINLOOKER.

## Prerequisites

### NPM Token Setup

1. **Generate NPM Access Token**:
   - Go to [npmjs.com](https://www.npmjs.com/) and log in
   - Go to Access Tokens: https://www.npmjs.com/settings/tokens
   - Click "Generate New Token"
   - Select "Automation" type (for CI/CD)
   - Copy the generated token

2. **Add Token to GitHub Secrets**:
   ```bash
   # Using GitHub CLI
   gh secret set NPM_TOKEN --body "your-npm-token-here"
   
   # Or via GitHub UI
   # Go to: Settings → Secrets and Variables → Actions
   # Click "New repository secret"
   # Name: NPM_TOKEN
   # Value: your-npm-token-here
   ```

## Release Methods

### Method 1: Manual Release Creation (Recommended)

Use the "Create Release" workflow for full control:

1. **Go to GitHub Actions**: https://github.com/AroraShreshth/domainlooker/actions
2. **Select "Create Release" workflow**
3. **Click "Run workflow"**
4. **Configure options**:
   - **Version bump type**: patch, minor, or major
   - **Custom version**: Optional specific version (e.g., "1.2.3")
   - **Pre-release**: Check if this is a beta/alpha release
   - **Draft**: Check to create draft release (won't trigger npm publish)

5. **The workflow will**:
   - Bump version in package.json and CLI
   - Run comprehensive tests
   - Generate changelog from git commits
   - Create git tag and push changes
   - Create GitHub release with package attachment
   - If not draft, triggers automatic npm publish

### Method 2: GitHub Release Trigger

Create a release directly on GitHub:

1. **Go to Releases**: https://github.com/AroraShreshth/domainlooker/releases
2. **Click "Create a new release"**
3. **Create new tag** (e.g., "v0.1.2")
4. **Add release title and description**
5. **Publish release**
6. **This triggers automatic npm publish**

### Method 3: Manual Workflow Dispatch

Use the "Release & Publish" workflow:

1. **Go to GitHub Actions**
2. **Select "Release & Publish" workflow**
3. **Click "Run workflow"**
4. **Select version bump type**
5. **Enable/disable dry run**

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

### Examples:
- Bug fix: `0.1.1` → `0.1.2`
- New feature: `0.1.2` → `0.2.0`
- Breaking change: `0.2.0` → `1.0.0`

## Release Checklist

### Pre-Release
- [ ] All tests pass (`npm run test`)
- [ ] Code builds successfully (`npm run build`)
- [ ] Documentation is up to date
- [ ] CHANGELOG reflects new changes
- [ ] Version bump is appropriate (semver)

### During Release
- [ ] Workflow completes successfully
- [ ] GitHub release is created
- [ ] npm package is published
- [ ] Package is accessible: `npm info domainlooker`

### Post-Release
- [ ] Verify installation: `npm install -g domainlooker@latest`
- [ ] Test CLI functionality: `domainlooker --help`
- [ ] Update documentation if needed
- [ ] Announce release (if major)

## Rollback Process

If a release has issues:

1. **Deprecate problematic version**:
   ```bash
   npm deprecate domainlooker@1.2.3 "Version has critical issues, please upgrade"
   ```

2. **Publish patch version** with fixes

3. **Mark GitHub release as pre-release** if needed

## Release Notes Template

When creating manual releases, use this template:

```markdown
## 🚀 DOMAINLOOKER v{VERSION}

### 🎯 What's New
Brief description of major changes or features.

### ✨ New Features
- 🔍 Feature 1: Description
- 🌐 Feature 2: Description

### 🐛 Bug Fixes
- Fixed issue with...
- Resolved problem where...

### 🔧 Improvements
- Enhanced performance of...
- Better error handling for...

### 📦 Installation
\`\`\`bash
npm install -g domainlooker@{VERSION}
\`\`\`

### 🚀 Quick Start
\`\`\`bash
domainlooker example.com
\`\`\`

### 🔗 Links
- 📖 [Documentation](https://github.com/AroraShreshth/domainlooker#readme)
- 📦 [npm Package](https://www.npmjs.com/package/domainlooker)
- 🐛 [Report Issues](https://github.com/AroraShreshth/domainlooker/issues)

---
**Made with ❤️ for the cybersecurity and developer community**
```

## Automation Details

### Workflows Overview

1. **create-release.yml**: Manual release creation with full control
   - Bumps version
   - Generates changelog
   - Creates GitHub release
   - Attaches package tarball

2. **release.yml**: Automated publishing triggered by releases
   - Validates release readiness
   - Publishes to npm
   - Handles both manual and GitHub-triggered releases

3. **ci.yml**: Continuous integration for all changes
   - Runs on every push and PR
   - Multi-platform testing
   - Security audits

### Secret Requirements

- `NPM_TOKEN`: Required for npm publishing
- `GITHUB_TOKEN`: Automatically provided by GitHub

## Troubleshooting

### Common Issues

1. **NPM_TOKEN not configured**
   - Error: "npm ERR! need auth"
   - Solution: Add NPM_TOKEN secret

2. **Version already exists**
   - Error: "version already exists"
   - Solution: Bump version number or use different version

3. **Tests failing**
   - Error: Test suite failures
   - Solution: Fix tests before release

4. **Build errors**
   - Error: TypeScript compilation errors
   - Solution: Fix build issues before release

### Support

For release issues:
1. Check GitHub Actions logs
2. Verify all secrets are configured
3. Ensure tests pass locally
4. Open issue with detailed error information