import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// initialize firebase app and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// create authentication methods
const googleSignIn = async () => {
  // googleProvider.setCustomParameters({ hd: "bangpaeschool.ac.th" });
  googleProvider.setCustomParameters({ hd: "webmail.npru.ac.th" });

  const result = await signInWithPopup(auth, googleProvider);
  const email = result.user.email;
  // Check email domain
  if (!email.endsWith("@webmail.npru.ac.th")) {
    auth.signOut();
    throw new Error("กรุณาใช้บัญชี @bangpaeschool.ac.th ในการเข้าสู่ระบบ");
  }
  return result;
};
const logout = () => signOut(auth);
const listenToAuthChanges = (callback) => onAuthStateChanged(auth, callback);

export { auth, googleSignIn, logout, listenToAuthChanges };
