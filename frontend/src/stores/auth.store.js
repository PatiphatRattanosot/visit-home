import { create } from "zustand";
import Swal from "sweetalert2";
import {
  googleSignIn,
  logout,
  listenToAuthChanges,
} from "../configs/firebase.config";

export const useAuthStore = create((set) => {
  // listen to auth state changes on load
  listenToAuthChanges((user) => {
    set({ user, isLoading: false });
  });

  // create zustand store object
  return {
    user: null,
    isLoading: false,
    signInSystem: async () => {
      try {
        await googleSignIn();
        Swal.fire({
          title: "สำเร็จ!",
          text: "ลงชื่อเข้าใช้งานสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.log("error at login:", error);
      }
    },
    signOutSystem: () => {
      try {
        Swal.fire({
          title: "คุณแน่ใจหรือไม่?",
          text: "คุณกำลังจะออกจากระบบ!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#c1121f",
          cancelButtonColor: "#e5e5e5",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await logout();
            Swal.fire({
              title: "สำเร็จ!",
              text: "ลงชื่อออกจากระบบสำเร็จ",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      } catch (error) {
        console.log("error at logout:", error);
      }
    },
  };
});
