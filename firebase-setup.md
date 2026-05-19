# Firebase Setup Instructions

To get this application running, you need to create a Firebase project and configure Authentication and Firestore.

## 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and follow the steps.

## 2. Enable Google Authentication
1. In the left menu, go to **Build** > **Authentication**.
2. Click **Get Started**.
3. Go to the **Sign-in method** tab.
4. Click **Add new provider** and select **Google**.
5. Enable it, provide a support email, and save.

## 3. Set up Firestore Database
1. In the left menu, go to **Build** > **Firestore Database**.
2. Click **Create database**.
3. Choose **Start in test mode** (for local development) or **production mode**.
4. Choose a location and click **Enable**.

## 4. Firestore Security Rules
Go to the **Rules** tab in Firestore and replace the default rules with the following to ensure users can only read and write their own tasks:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 5. Get Firebase Configuration
1. Go to **Project Overview** and click the **Web** icon (`</>`) to add a web app.
2. Register the app (you can skip Firebase Hosting for now).
3. Copy the `firebaseConfig` object provided.
4. Create a `.env` file in the root of the project (`c:\taskmanager\.env`).
5. Add your configuration values to the `.env` file like this:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Run the app using `npm run dev`.
