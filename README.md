# Gharpayy CRM

A full-stack CRM solution built with a "Cyber Clay" aesthetic. This repository contains both a responsive **Next.js Web Application** and a native **React Native Mobile App** to manage your leads, track your pipeline, and interact with your team.

![Gharpayy Logo](public/logo.png)

## 📌 Features

### Web Application (Next.js)

- **Interactive Dashboard**: Features interactive conversion charts, real-time KPI overview, and quick-action lead metrics.
- **Lead Management**: Filter, view, and interact with a mock database of prospective buyers. Complete with pagination, visual tags for lead sources, and stage indicators.
- **Kanban Sales Pipeline**: A visually engaging, drag-and-drop-style (visualized) board. Move leads logically from "New" ➡️ "Contacted" ➡️ "Site Visit" ➡️ "Won".
- **Agent Directory**: Displays performance tracking and profiles of active CRM agents.
- **Fully Responsive**: Optimizations ensure the dashboard looks perfectly tailored to 4k monitors and mobile browsers alike.

### Mobile Application (React Native)

- **Built for Android & iOS**: Full cross-platform support with native feel.
- **Secure Authentication**: Uses JWT style tokenization configured smoothly over AsyncStorage.
- **Bottom Tab Navigation**: Clean, custom navigation jumping effortlessly between the Dashboard, Leads, and Pipeline.
- **Stage Modals**: Tap on any lead in the pipeline to trigger a specialized native modal presenting deeper contact information without leaving the view.
- **Smooth Layout Adjustments**: Configured using `react-native-safe-area-context` to safely adapt to device notches, punch-holes, and dynamic swipe bars.

## 🛠 Tech Stack

- **Web**: React 18, Next.js 14, Tailwind CSS, Lucide Icons, Recharts (for Dashboard data visualization).
- **Mobile**: React Native, React Navigation (Native Stack + Bottom Tabs), Axios, AsyncStorage.
- **Data/Backend**: Custom configured Next.js API Routes acting as a lightweight backend connecting to a localized JSON data store (`src/data/leads.json`).

---

## 🚀 Getting Started

To get a local instance of both systems running:

### 1. The Web Application (Next.js)

First, install dependencies at the root of the project:

```bash
npm install
# or yarn install / pnpm install
```

Start the web development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

- **Login Credentials**:
  - The login portal is pre-configured. Use `admin` as the username and **any** password to bypass the portal and enter the application!

### 2. The Mobile Application (React Native)

Navigate to the internal React Native directory:

```bash
cd CRM_app/gharpayy_CRM
```

Install mobile dependencies:

```bash
npm install
```

Start the Metro Bundler:

```bash
npm start
```

Run the application on an emulator or plugged-in device:

```bash
npm run android
# or
npm run ios
```

_Note: The mobile app defaults to drawing its data from the localized mock JSON system (`src/data/leads.json`) within the native shell to ensure maximum performance and offline functionality._

---

## 📦 APK Installation

You do not have to build the application from scratch to test it! A pre-built `.apk` release has been placed in the public directory of this project.

1. Navigate to `public/gharpayy-crm.apk`
2. Download the file directly to your Android device.
3. Tap to install (you may need to allow "Unknown Sources" from your browser/file manager settings).

## 🗃️ Database Structure

Data is localized in the `/data` and `/src/data` directories mimicking a NoSQL structure. The Next.js API layer parses these files to emulate live CRUD actions without requiring difficult MongoDB integrations for testing.

---

> **Design Note**: The user interface relies heavily on the "Cyber Clay" concept—characterized by soft `#f5ebe0` cream backgrounds, elevated soft-shadowed white cards (`#fff`), and strong `#bc4749` terracotta red accents. Avoid introducing pure `#000000` or `#ffffff` outer layouts without considering depth.
