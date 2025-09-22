# Storybook for @inspirasi/ui

How to run Storybook for the UI package locally:

1. From the repo root (pnpm workspace):

```powershell
pnpm -C .\packages\ui install # only if you haven't installed root deps
pnpm -C .\packages\ui run storybook
```

Notes and gotchas
- Storybook in this repo currently runs Storybook 8.x at runtime but the package devDependencies may reference 7.x. You will see a WARN about incompatible packages. The workspace is known to work locally with the installed packages; to remove the warning either upgrade the `@storybook/*` deps to 8.x or pin the Storybook CLI to the matching major.
- Tailwind integration: `packages/ui/.storybook/preview.ts` imports `../src/styles.css` which should include the Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`). Make sure `postcss` and `tailwindcss` are available in your devDependencies.
- If Storybook fails to start with Vite errors, run `pnpm -w install` at repository root and re-run.

CI
If you want a static Storybook build in CI, use `pnpm -C packages/ui run build-storybook` and upload the generated `packages/ui/storybook-static/` directory as an artifact.

If you run into issues, paste any relevant logs and I can help troubleshoot further.

Automatic publishing
- This repository includes a GitHub Actions workflow that builds the Storybook static site and publishes it to the `gh-pages` branch. The workflow will run on pushes to `main` and when manually triggered via the Actions UI (workflow_dispatch).
- Requirements:
	- The repository must allow Actions to create and push to `gh-pages` using the provided `GITHUB_TOKEN` (standard in GitHub Actions). If your org restricts Actions, create and store a deploy token as a repository secret and replace `GITHUB_TOKEN` in the workflow with that secret.
	- In the repository Settings → Pages, configure the site source to be the `gh-pages` branch (or use the default Pages setup after the first publish).

