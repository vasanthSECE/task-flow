# Task Management App

A minimal full-stack Task Management web application built with React, Vite, Tailwind CSS, and Firebase.

## Features
- Google Authentication via Firebase Auth.
- Create, view, and update task statuses.
- Real-time updates with Firestore.
- Protected routes (authenticated users only).
- Responsive, modern UI using Tailwind CSS.

## Requirements
- Node.js installed
- Firebase project setup (see `firebase-setup.md`)

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup Firebase:
   - Create a `.env` file in the root directory based on the `.env.example` format (see `firebase-setup.md`).
   - Add your Firebase configuration keys.

3. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and sign in.
3. Click **Add New** > **Project**.
4. Import your GitHub repository.
5. In the **Environment Variables** section, add all your `VITE_FIREBASE_*` keys from your `.env` file.
6. Click **Deploy**. Vercel will automatically detect that it's a Vite project and run `npm run build`.
