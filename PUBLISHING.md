# 📦 Publishing Guide (NPM)

This document explains how to publish the package to **npm**.

---
## Prerequisites
- Ensure you have the necessary permissions to publish the package on npm.
- Ensure you have committed and pushed all changes to the main branch.
- Ensure you have bumped the version according to [VERSIONING.md](./VERSIONING.md).

## Publishing Steps
1. **Login to npm** (if not already logged in):
   ```bash
   npm login
   ```
2. **Publish the package**:
   ```bash
   npm publish --access public
   ```