# WrkZone - Android App & Google Play Store Setup Guide

## 📱 **Current Status: Converting to Mobile App**

Your Next.js web app has been configured with **Capacitor** to run as a native Android app. This guide explains the complete setup and deployment to Google Play Store.

---

## 🚀 **Step 1: Initial Capacitor Setup**

### 1.1 Initialize Capacitor Project
```bash
npm run cap:init
```

When prompted:
- **App name**: WrkZone
- **App Package ID**: com.wrkzone.app
- **Web assets directory**: out (Next.js export directory)
- **Build command**: npm run build

### 1.2 Add Android Platform
```bash
npm install @capacitor/android
npx cap add android
```

This creates the `android/` folder with native Android project files.

### 1.3 Install Android Studio
- Download Android Studio: https://developer.android.com/studio
- Install with Android SDK (API 33+)
- Set up Android emulator

---

## 🔨 **Step 2: Build & Test Locally**

### 2.1 Build Next.js for Export
```bash
npm run build
```

This creates the `out/` folder with static files.

### 2.2 Sync to Android
```bash
npm run cap:sync android
```

This syncs the web files to the Android project.

### 2.3 Open Android Studio
```bash
npm run android
```

This opens Android Studio with your project. Click **Run** or press **Shift+F10** to run on emulator/device.

---

## 📋 **Step 3: Google Play Store Setup**

### 3.1 Google Play Developer Account
1. Go to https://play.google.com/console
2. Create a developer account ($25 one-time fee)
3. Complete business profile
4. Accept agreements

### 3.2 Create Signing Key
```bash
# Generate keystore (run once)
keytool -genkey -v -keystore ~/wrkzone-key.keystore \
  -alias wrkzone \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Save the password securely!**

### 3.3 Configure Android App Signing

Edit `android/app/build.gradle`:

```gradle
android {
    // ... existing config

    signingConfigs {
        release {
            storeFile file(System.getenv("KEYSTORE_PATH") ?: "../../wrkzone-key.keystore")
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEYSTORE_ALIAS") ?: "wrkzone"
            keyPassword System.getenv("KEYSTORE_KEY_PASSWORD")
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 3.4 Build Release APK/AAB

#### For APK (older devices):
```bash
cd android && ./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

#### For AAB (recommended for Play Store):
```bash
cd android && ./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 📦 **Step 4: Prepare Google Play Store Listing**

### 4.1 App Details
- **App name**: WrkZone
- **Short description**: (80 chars max) "Find trusted local services in India"
- **Full description**: Your app description from README
- **Category**: Services
- **Content rating**: Fill questionnaire

### 4.2 Screenshots (5-8 required)
Create screenshots from your app:
- **Sizes**: 1080x1920px (9:16 aspect ratio)
- **Upload to Google Play Console**

Required screens:
1. Hero/Home screen
2. Browse services
3. Service details
4. Search functionality
5. User dashboard

### 4.3 App Icon
- **Size**: 512x512px
- **PNG format**
- **Safe zone**: 192x192px center area
- **No transparency required**

Create at: [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)

### 4.4 Privacy Policy & Terms
- **Required**: Privacy Policy URL
- **Recommended**: Terms of Service URL
- **Host on**: Your domain (e.g., https://wrkzone.com/privacy)

---

## 🔒 **Step 5: Security & Compliance**

### 5.1 Firebase Setup (Recommended)
```bash
npm install firebase
```

Add Firebase configuration to your app for:
- Crash reporting
- Performance monitoring
- Analytics

### 5.2 Permissions (android/app/src/main/AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### 5.3 App Version
Update `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        applicationId "com.wrkzone.app"
        minSdkVersion 24
        targetSdkVersion 34
        versionCode 1
        versionName "0.1.0"
    }
}
```

---

## 📤 **Step 6: Upload to Google Play Store**

### 6.1 Create App on Play Console
1. Go to Google Play Console
2. Click **Create app**
3. App name: "WrkZone"
4. Default language: English
5. App or game: App
6. Category: Tools
7. Content rating: Questionnaire

### 6.2 Upload Release Build
1. **Internal Testing** → Upload AAB
2. **Closed Testing** → 20+ beta testers, test 1+ week
3. **Production** → Submit for review (1-3 hours)

### 6.3 Fill Compliance Information
- [ ] Content rating questionnaire
- [ ] Privacy policy
- [ ] Permissions justification
- [ ] Ads policy
- [ ] Government apps designation
- [ ] Export compliance

---

## 🔄 **Troubleshooting**

### Build Fails
```bash
cd android
./gradlew clean
cd .. && npm run cap:sync android
```

### App Crashes on Android
1. Check logcat: `adb logcat`
2. Verify Next.js `out/` folder exists
3. Check `index.html` in `out/` folder
4. Verify internet permission in manifest

### White Screen After Launch
- Check `capacitor.config.json` webDir path
- Verify Next.js build completed successfully
- Check browser console for errors

### Play Store Submission Rejected
Common reasons:
- **Broken functionality**: Test all features
- **Privacy policy missing**: Add URL in manifest
- **Crash on startup**: Fix bugs before resubmission
- **Permissions not justified**: Add explanations
- **Ads without disclosure**: If using ads, disclose clearly

---

## 📊 **Monitoring & Updates**

### Crash Analytics
- Set up Firebase Crashlytics
- Monitor errors in Google Play Console
- Fix bugs and publish hotfix versions

### Version Updates
```bash
# Bump version in android/app/build.gradle
# Then:
npm run build
npm run cap:sync android
cd android && ./gradlew bundleRelease
```

Upload new AAB to Play Store in **Production** tab.

---

## ✅ **Checklist Before First Submission**

- [ ] Capacitor initialized
- [ ] App builds successfully locally
- [ ] Tested on Android emulator/device
- [ ] Signing key created and secured
- [ ] Google Play developer account created
- [ ] App icon 512x512 created
- [ ] 5-8 screenshots taken (1080x1920)
- [ ] Privacy policy URL ready
- [ ] App description written
- [ ] Release build tested
- [ ] AAB generated successfully
- [ ] All permissions justified
- [ ] Content rating completed

---

## 📱 **App Store Ready!**

Your WrkZone Android app is now configured for Google Play Store. Follow the steps above to build, test, and submit.

**Questions?** Check Capacitor docs: https://capacitorjs.com/docs/getting-started
