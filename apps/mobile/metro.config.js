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
          // Try to resolve the package.json for the package base name. This returns the path inside pnpm's
          // .pnpm store (e.g. node_modules/.pnpm/<pkg>@.../node_modules/<pkg>), which Metro can use as module root.
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
