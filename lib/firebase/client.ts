import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKVt0CVU7A0psY8dvw2BlJ25bL8w3EhGk",
  authDomain: "brief-form-8a738.firebaseapp.com",
  projectId: "brief-form-8a738",
  storageBucket: "brief-form-8a738.firebasestorage.app",
  messagingSenderId: "324345190062",
  appId: "1:324345190062:web:b3e9778ca0f3f5042b7f3f"
};

const isFirebaseConfigured =
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.authDomain &&
  !!firebaseConfig.projectId &&
  !!firebaseConfig.appId;

const app = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

export { auth, db, firebaseConfig, isFirebaseConfigured };