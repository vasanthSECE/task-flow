# TaskFlow - Task Management Application

# Live Application

https://task-flow-steel-rho.vercel.app



# GitHub Repository

https://github.com/vasanthSECE/task-flow



# Project Overview

TaskFlow is a minimal task management web application built using React, Firebase Authentication, and Firestore.

The application allows users to:
- Sign in using Google Authentication
- Create tasks
- View their tasks
- Update task status

Task statuses:
- Planned
- In Progress
- Complete

The project was intentionally kept minimal and focused according to the assessment requirements.

---

# Tech Stack

Frontend:
- React + Vite
- Tailwind CSS

Backend / Services:
- Firebase Authentication
- Firebase Firestore

Deployment:
- Vercel

---

# Features

## Authentication
- Google Sign-In using Firebase Authentication
- Persistent login session
- Logout functionality

## Task Management
- Create tasks
- View realtime task updates
- Update task status

## UI
- Responsive modern dashboard
- Glassmorphism-inspired UI
- Status color indicators
- Empty state handling

---

# How to Access the Application

Open the deployed application:

https://task-flow-steel-rho.vercel.app

---

# Login Instructions

1. Open the application
2. Click:
   "Sign in with Google"
3. Select your Google account
4. After successful login, the dashboard opens automatically

---

# How to Use the Application

## Create a Task
1. Enter task title in the input field
2. Click "Add"

## Update Task Status
Use the dropdown on each task card to change status:
- Planned
- In Progress
- Complete

## Logout
Click the Logout button in the dashboard navbar

---

# Important Assumptions

The following assumptions were made during development:

1. Each user can only access their own tasks
2. Task title is mandatory
3. Tasks are ordered by latest created
4. Only authenticated users can access the dashboard
5. Delete/edit task functionality was excluded because it was not part of requirements
6. Minimalistic UI was prioritized over advanced feature expansion

---

# Known Limitations

1. No task deletion feature
2. No task editing functionality
3. No drag-and-drop task management
4. No offline support
5. Limited validation for task input

---

# Important Notes

1. Google Authentication is required to use the application
2. Firebase free-tier services are used
3. Internet connection is required for realtime Firestore updates

---

# Setup Instructions (Local Development)

## Clone Repository

```bash
git clone https://github.com/vasanthSECE/task-flow
```

## Navigate to Project

```bash
cd task-flow
```

## Install Dependencies

```bash
npm install
```

## Create .env File

Create a `.env` file in the project root and add:

```env
VITE_FIREBASE_API_KEY=YOUR_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

## Run Application

```bash
npm run dev
```

---

# Firebase Configuration

The application uses:
- Firebase Authentication
- Cloud Firestore

Firestore rules restrict users to accessing only their own tasks.

---

# AI Usage Summary

## AI Tools Used

- ChatGPT
- Antigravity AI

---

# How AI Was Used

AI tools were used to:
- Generate React component structure
- Create Firebase integration code
- Generate Tailwind CSS styling
- Assist with Firestore setup
- Improve UI design
- Debug deployment and environment configuration
- Generate documentation structure

---

# Manual Corrections and Improvements

The following were manually corrected or improved:

1. Firebase environment variable configuration
2. Firestore security rules
3. Vercel deployment configuration
4. Authentication setup debugging
5. CSS enhancements and UI refinements
6. Firebase authorized domain configuration
7. Project structure adjustments

---

# Example AI Prompts

Examples:
- "Build a minimal task management app using React and Firebase"
- "Create modern dashboard UI using Tailwind CSS"
- "Generate Firestore CRUD operations"
- "Improve glassmorphism styling"

---

# Future Improvements

Possible future enhancements:
- Task deletion
- Task editing
- Search and filtering
- Drag-and-drop kanban board
- Notifications
- Dark mode
- Due dates

---

# Author

Vasanth R
B.Tech AI & DS
SECE