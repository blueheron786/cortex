/**
 * Capacitor entry point
 * Initializes the Capacitor API and sets up the app for mobile
 */
import { capacitorAPI } from './src/capacitor-api.js';

// Expose API to window object for compatibility with existing code
window.api = capacitorAPI;
window.api.isElectron = false;
window.api.isCapacitor = true;

// Import and initialize the renderer
import './renderer-init.js';
