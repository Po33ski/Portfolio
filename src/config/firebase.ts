import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcB5H_UL6tG1maBnhrvJz2JCeq6gQBXAc",
  authDomain: "calculator-kcal.firebaseapp.com",
  projectId: "calculator-kcal",
  storageBucket: "calculator-kcal.appspot.com",
  messagingSenderId: "1084373415179",
  appId: "1:1084373415179:web:fc60dd66d337e674621e0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider)
  .then(() => {console.log("logged in")})
  .catch((error) => {
      console.log(error);
  });
};
const logInWithEmailAndPassword = async (email : string, password : string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name : string, email : string, password : string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
// This code represents rules used in Firebase with collection colections
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow write, update: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read, delete: if request.auth != null;
    }
  }
}
*/

