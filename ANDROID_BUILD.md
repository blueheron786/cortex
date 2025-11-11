# Cortex Android Build Guide

## 🎉 Cortex is now available on Android!

This guide will help you build and run Cortex on your Android device.

## Prerequisites

### Required Software
1. **Android Studio** - Download from [developer.android.com](https://developer.android.com/studio)
2. **Java JDK 17** - Required for Android builds
3. **Node.js** - Already installed (for development)

### Android SDK Setup
After installing Android Studio:
1. Open Android Studio
2. Go to `Tools → SDK Manager`
3. Install:
   - Android SDK Platform 33 (or latest)
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
4. Accept the license agreements

## Building for Android

### Step 1: Build the Web Assets
```bash
npm run build:web
```

This will:
- Bundle the app for Capacitor
- Copy assets to the `www/` directory
- Prepare for Android deployment

### Step 2: Sync to Android
```bash
npx cap sync android
```

This synchronizes your code and assets to the Android project.

### Step 3: Open in Android Studio
```bash
npx cap open android
```

This will open the project in Android Studio.

### Step 4: Build and Run

#### Option A: Run on Physical Device
1. Enable Developer Options on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable USB Debugging in Developer Options
3. Connect your device via USB
4. In Android Studio, select your device from the dropdown
5. Click the green "Run" button ▶️

#### Option B: Run on Emulator
1. In Android Studio, click the device dropdown
2. Select "Device Manager"
3. Create a new virtual device (recommended: Pixel 6, API 33+)
4. Click the green "Run" button ▶️

## Quick Commands Reference

```bash
# Build for web
npm run build:web

# Sync changes to Android
npx cap sync android

# Open Android Studio
npx cap open android

# Quick build and open (combines all steps)
npm run cap:android
```

## File Storage on Android

Cortex stores your markdown files in:
```
Documents/cortex-vault/
```

This is accessible via:
- Android's built-in file manager
- Any file manager app
- The Capacitor Filesystem API

## Architecture Changes

### Desktop (Electron) vs Mobile (Capacitor)

| Feature | Desktop | Android |
|---------|---------|---------|
| Backend | Node.js (main.js) | Capacitor Plugins |
| File System | Node fs module | @capacitor/filesystem |
| Folder Picker | Native dialog | Auto-creates vault folder |
| Settings | App data folder | LocalStorage |

### Key Files

- **capacitor-main.js** - Capacitor entry point
- **src/capacitor-api.js** - Bridges Electron API to Capacitor
- **renderer-init.js** - Shared UI logic for both platforms
- **www/** - Built web assets for Capacitor

## Troubleshooting

### Build fails with "Could not find Android SDK"
1. Open Android Studio
2. Let it download/update SDK components
3. Set `ANDROID_HOME` environment variable to your SDK location
   - Windows: `C:\Users\[USERNAME]\AppData\Local\Android\Sdk`
   - Mac: `~/Library/Android/sdk`

### App crashes on startup
1. Check Android Studio Logcat for errors
2. Ensure all permissions are granted in device settings
3. Try uninstalling and rebuilding

### Files not saving
1. Grant storage permissions when prompted
2. Check app permissions in device settings
3. Verify the vault folder exists in Documents

### TipTap editor not working
1. Ensure you're using HTTPS scheme (already configured)
2. Check for JavaScript errors in Chrome DevTools
   - Chrome → `chrome://inspect`
   - Select your device

## Development Workflow

### Making Changes

1. Edit source files (renderer-init.js, src/*, etc.)
2. Rebuild: `npm run build:web`
3. Sync: `npx cap sync android`
4. The app will hot-reload on the device

### Testing Both Platforms

Desktop (Electron):
```bash
npm start
```

Android:
```bash
npm run cap:android
```

## Mobile-Specific Features

✅ **Touch-optimized UI** - Larger tap targets, better spacing
✅ **Responsive layout** - Adapts to phone and tablet screens
✅ **Auto-load vault** - Opens your vault automatically on launch
✅ **Mobile keyboard** - Optimized for on-screen keyboards
✅ **Swipe gestures** - Natural mobile interactions

## Known Limitations

⚠️ **Folder picker** - Currently auto-creates a vault folder (native picker requires custom plugin)
⚠️ **File system** - Scoped to app's Documents directory (Android security)
⚠️ **Background sync** - Files sync when app is active only

## Next Steps

Want to publish to Google Play? Check out:
- [Capacitor Publishing Guide](https://capacitorjs.com/docs/android/deploying-to-google-play)
- Generate signing keys
- Configure versioning in `android/app/build.gradle`
- Create Play Store listing

## Need Help?

- Capacitor Docs: https://capacitorjs.com/docs
- Android Developer Docs: https://developer.android.com
- Check GitHub issues for common problems

Happy mobile editing! 📱✍️
