import admin from "firebase-admin";
import { getFirestore } from "firebase/firestore";

if (!admin.apps.length) {
  let serviceAccount;
  try {
    serviceAccount = {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID_LMS,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY_LMS,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL_LMS,
    };
  } catch (error) {
    throw new Error("Invalid JSON in FIREBASE_SERVICE_ACCOUNT_KEY");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuthLMS = admin.auth();
export const adminFirestoreLMS = admin.firestore()
export const FieldValue = admin.firestore.FieldValue;