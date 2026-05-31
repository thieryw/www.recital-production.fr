#!/usr/bin/env bash
#
# Creates a branch with the SEO changes and opens a pull request.
#
# Usage:
#   1. Put these three files in the ROOT of your repo clone:
#        create-seo-pr.sh   recital-seo.patch   PR_DESCRIPTION.md
#   2. Make sure your working tree is clean (commit/stash anything first).
#   3. Run:  bash create-seo-pr.sh
#
# Requires: git. Optionally the GitHub CLI (`gh`) to open the PR automatically;
# without it, the script prints a compare URL you can click.

set -euo pipefail

BRANCH="seo/per-route-metadata"
BASE="main"
PATCH="recital-seo.patch"
BODY="PR_DESCRIPTION.md"
TITLE="SEO: per-route metadata, structured data, sitemap/robots, www canonical"

# Must be inside a git repo
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "Error: run this from inside your repo clone."; exit 1;
}

# Refuse to run on a dirty tree (so we don't mix unrelated changes in)
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: working tree has uncommitted changes. Commit or stash them first."; exit 1;
fi

# Create (or reuse) the branch off the latest base
git fetch origin "$BASE" || true
git checkout -b "$BRANCH" 2>/dev/null || git checkout "$BRANCH"

# Apply the patch if it hasn't been applied yet
if [ -f "$PATCH" ] && git apply --check "$PATCH" >/dev/null 2>&1; then
  git apply "$PATCH"
  echo "Applied $PATCH"
else
  echo "Patch not applied (already applied, or not found) — using current changes."
fi

git add -A
if git diff --cached --quiet; then
  echo "Nothing to commit. Did you place recital-seo.patch in the repo root?"; exit 1;
fi

git commit -m "$TITLE"
git push -u origin "$BRANCH"

# Open the PR
if command -v gh >/dev/null 2>&1; then
  if [ -f "$BODY" ]; then
    gh pr create --base "$BASE" --head "$BRANCH" --title "$TITLE" --body-file "$BODY"
  else
    gh pr create --base "$BASE" --head "$BRANCH" --title "$TITLE" --body "See commit."
  fi
else
  REMOTE_URL="$(git remote get-url origin)"
  SLUG="$(echo "$REMOTE_URL" | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')"
  echo ""
  echo "GitHub CLI not found. Open the PR here:"
  echo "  https://github.com/${SLUG}/compare/${BASE}...${BRANCH}?expand=1"
  echo "(Paste PR_DESCRIPTION.md as the PR body.)"
fi
