import admin from "firebase-admin";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

let app: admin.app.App;

if (!admin.apps.length) {
  if (
    !process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT ||
    !process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  ) {
    throw new Error("Missing Firebase Admin credentials or storage bucket.");
  }
  const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT);
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
} else {
  app = admin.app();
}

const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const adminStorage: Storage = getStorage(app);

export { db, auth, adminStorage };
