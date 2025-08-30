# GitHub Pages Deployment Troubleshooting Guide

If you're seeing a failure in the GitHub Actions deployment step, follow these steps to troubleshoot:

## 1. Verify GitHub Repository Settings

1. Go to your repository on GitHub: https://github.com/DheerajSai24/MERN-Learning-Management-System
2. Navigate to Settings > Pages
3. Under "Build and deployment", make sure:
   - Source is set to "GitHub Actions"
   - If not, change it from "Deploy from a branch" to "GitHub Actions"

## 2. Check Repository Permissions

1. Go to Settings > Actions > General
2. Scroll down to "Workflow permissions"
3. Make sure "Read and write permissions" is selected
4. Save changes if needed

## 3. Verify Repository Visibility

- GitHub Pages works differently for private vs. public repositories
- If your repository is private, make sure you have GitHub Pro or an organization account that supports private GitHub Pages

## 4. Review Recent Workflow Runs

1. Go to the "Actions" tab in your repository
2. Click on the most recent "Deploy to GitHub Pages" workflow run
3. Look for specific error messages in the logs

## 5. Ensure Case Sensitivity Matches

The repository name in your configuration must exactly match the actual repository name:

- Actual repository name: `MERN-Learning-Management-System` 
- All URLs should use: `/MERN-Learning-Management-System/` (with exact capitalization)

## 6. Verify Branch Name

- Your workflow is configured to run on the `main` branch
- Make sure you're pushing to the `main` branch, not `master` or another branch

## 7. Manual Deployment Alternative

If GitHub Actions continues to fail, you can use the manual gh-pages deployment:

```bash
npm run deploy
```

This will build your project and push it to the `gh-pages` branch.

## 8. Check for Specific Errors

Common GitHub Actions errors:

- **404 Error**: Repository doesn't exist or permissions issue
- **Build errors**: Check if the build step completed successfully
- **Upload artifact errors**: Check if the upload step was successful
- **Deploy errors**: Usually related to permissions or GitHub Pages settings

After making any changes, commit and push your updates, then monitor the Actions tab for the new workflow run.
