# 📦 Versioning Guide (npm & git)

This document explains how to bump versions using **npm** and **git**, following Semantic Versioning (SemVer).

---

## 📝 Commit Convention

We use **Conventional Commits** to keep a clean and meaningful history:

- `feat:` → when adding a new **feature** (usually leads to a `minor`, or `major` if breaking).  
- `fix:` → when fixing a **bug** (`patch`).  
- `chore:` → for changes **not related to production code**, such as version bumps, configs, or CI/CD.  
- `docs:` → for **documentation** updates.  
- `refactor:` → for code changes that **don’t affect behavior**.  
- `test:` → when updating or adding **tests**.

## 🔢 Version Structure (SemVer)

Versions follow the format:

`MAJOR.MINOR.PATCH`

- **MAJOR** → changes that **break compatibility** (breaking changes).  
  Example: `1.0.0` → `2.0.0`  

- **MINOR** → new features that are **backward compatible**.  
  Example: `1.1.0` → `1.2.0`  

- **PATCH** → **bug fixes** or small improvements.  
  Example: `1.1.1` → `1.1.2`

1. Commit all your changes to the `main` branch with a meaningful message following the commit convention.

2. Run **one** of the following:

```bash
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0
```

2. Push the changes to the remote repository:

```bash
git push origin main --follow-tags
```