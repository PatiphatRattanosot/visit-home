import { useState, useEffect, createContext } from "react";
import { auth, googleProvider } from "../configs/firebase.config";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import Swal from "sweetalert2";
// Create context for authentication
export const AuthContext = createContext();

// Create a provider for access context
export const AuthProvider = ({ children }) => {
  // เก็บ user
  const [user, setUser] = useState(null);
  // เก็บสถานะการโหลด ไว้เช็คว่า login เสร็จยัง
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const logout = () => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณกำลังจะออกจากระบบ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c1121f",
      cancelButtonColor: "#e5e5e5",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth);
        Swal.fire({
          title: "สำเร็จ!",
          text: "ลงชื่อออกจากระบบสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider).then(() =>
      Swal.fire({
        title: "สำเร็จ!",
        text: "ลงชื่อเข้าใช้งานสำเร็จ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUser(currentUser);
        setIsLoggingIn(true);
        const { email } = currentUser;
        console.log("email", email);
      }
      setIsLoggingIn(true);
    });
    return unsubscribe;
  }, [auth]);

  const authInfo = {
    user,
    isLoggingIn,
    googleSignIn,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
