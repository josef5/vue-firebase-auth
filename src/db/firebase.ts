import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUgx4HiSUYXAQYvPC1xjcT7GCy-Yq-vo8",
  authDomain: "vue-firebase-auth-c4f48.firebaseapp.com",
  projectId: "vue-firebase-auth-c4f48",
  storageBucket: "vue-firebase-auth-c4f48.appspot.com",
  messagingSenderId: "751515529522",
  appId: "1:751515529522:web:a3d45b9fd402c6677c672b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
