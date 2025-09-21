const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const fs = require('fs');

/**
 * Metro config to allow resolving workspace packages and watching them during development.
 * This adds the repo root to watchFolders and maps @inspirasi/ui to the packages/ui/src
 * so Metro can resolve the source files if the package isn't built to dist.
 */
module.exports = {
  projectRoot: path.resolve(__dirname),
  // Watch the repo root so Metro can see workspace packages (packages/*) during development
  watchFolders: [path.resolve(__dirname, '..', '..')],
  resolver: {
    blacklistRE: exclusionList([/nodejs-assets\/.*\\.zip/]),
    extraNodeModules: new Proxy({}, {
      get: (target, name) => {
        // Map the workspace UI package to the built dist output so Metro can import it directly
        if (name === '@inspirasi/ui') {
          // Map directly to the built dist output so Metro imports the published entry
          // (dist/index.js). This is the most reliable mapping for bundling in Expo.
          return path.resolve(__dirname, '..', '..', 'packages', 'ui', 'dist');
        }
        // If the request is a deep import like 'expo/AppEntry' or scoped package like
        // '@babel/runtime/helpers/xyz', compute the package base name correctly.
        let pkgName;
        if (name.startsWith('@')) {
          const parts = name.split('/');
          pkgName = parts.slice(0, 2).join('/');
        } else {
          pkgName = name.split('/')[0];
        }
        try {
          // Try resolving the package entry or package.json. Some packages (with an "exports" field) don't
          // permit importing their package.json via require.resolve('<pkg>/package.json'). Try resolving the
          // package itself first (this returns the package entry point), then fall back to package.json.
          try {
            const resolved = require.resolve(pkgName);
            // If resolved points to a file inside the package, return its package root directory.
            // Walk up until we find the package's package.json
            let dir = resolved;
            while (dir && dir !== path.parse(dir).root) {
              const candidate = path.join(dir, 'package.json');
              if (fs.existsSync(candidate)) {
                return path.dirname(candidate);
              }
              dir = path.dirname(dir);
            }
          } catch (err) {
            // Some packages don't expose the package entry; try package.json path which may fail on newer packages
          }
          const pkgJson = require.resolve(`${pkgName}/package.json`);
          return path.dirname(pkgJson);
        } catch (e) {
          // ignore and fallback
        }

        const appModule = path.join(__dirname, 'node_modules', name);
        const repoModule = path.join(__dirname, '..', '..', 'node_modules', name);
        // Prefer app-local node_modules, otherwise fall back to hoisted repo node_modules
        if (fs.existsSync(appModule)) return appModule;
        return repoModule;
      }
    }),
    sourceExts: ['ts', 'tsx', 'js', 'jsx', 'json']
  }
};
