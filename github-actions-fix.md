# Fixing GitHub Actions Deployment Issues

## Repository Name vs. Configuration

One common issue is that your repository name in GitHub might be different from what's in your configuration files. Let's make sure they match:

1. Your repository name according to GitHub: `mern-learning-management-system` (lowercase)
2. But in your configuration files, you're using: `MERN-Learning-Management-System` (mixed case)

GitHub URLs are case-sensitive, and this discrepancy could be causing the deployment issues.

## Fixing GitHub Actions Workflow

### 1. Check your repository name

Go to GitHub and confirm the exact case of your repository name. If it's `mern-learning-management-system` (all lowercase), update all your configuration files to match.

### 2. Update GitHub Pages configuration

In your repository settings:
1. Go to Settings > Pages
2. Under "Build and deployment":
   - Source: Select "GitHub Actions" (not "Deploy from a branch")

### 3. Add a `.nojekyll` file

Sometimes GitHub Pages tries to process your site with Jekyll, which can cause problems with React apps. Add an empty `.nojekyll` file to your build output:

Add this line to your package.json scripts:

```json
"build": "vite build && touch dist/.nojekyll",
```

For Windows systems, you'll need to use:

```json
"build": "vite build && type nul > dist/.nojekyll",
```

### 4. Update workflow permissions

1. Go to Settings > Actions > General
2. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Save changes

### 5. Use a simpler workflow file

Sometimes, a simpler workflow file might work better. Here's a more straightforward one:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

Replace your current `.github/workflows/deploy.yml` with this one.

### 6. Use the manual method consistently

If GitHub Actions continues to fail, consider sticking with the manual gh-pages deployment method:

```bash
npm run deploy
```

This method works by pushing your built files to a gh-pages branch, which GitHub Pages will automatically deploy.

## Important Note about Repository Names

If your repository name in GitHub truly is `MERN-Learning-Management-System` with that exact capitalization:
1. You need to ensure your repository settings match exactly
2. Update your GitHub repository URL settings to confirm

But if GitHub shows your repository as `mern-learning-management-system` (lowercase), all your configuration should use lowercase as well.

The GitHub interface might display it with capitalization, but the actual URL may use lowercase.
