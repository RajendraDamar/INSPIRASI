// Bridge entry for Expo - explicitly require expo's AppEntry so Metro resolves it reliably in a pnpm workspace on Windows.
// Local entry that registers the project's App with Expo.
// This avoids delegating to expo/AppEntry which contains relative imports that
// cause Metro to attempt resolving '../../App' from the expo package folder.
import { registerRootComponent } from 'expo';
import App from './src/App';

registerRootComponent(App);
