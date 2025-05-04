import { create } from "zustand";
import { persist } from "zustand/middleware";
import Swal from "sweetalert2";
import {
  googleSignIn,
  logout,
  listenToAuthChanges,
} from "../configs/firebase.config";
import AuthServices from "../services/auth.service";

export const useAuthStore = create(
  persist((set, get) => {
    // listen to auth state changes on load
    listenToAuthChanges((user) => {
      set({ user, isLoading: false });
    });

    // create zustand store object
    return {
      user: null,
      userInfo: null,
      isLoading: false,
      signInSystem: async () => {
        try {
          await googleSignIn().then(async (result) => {
            const email = result.user.email;
            // const email = "bp999@bangpaeschool.ac.th";

            const res = await AuthServices.sign({ email });
            if (res.status === 200) {
              const userInfo = res.data?.user;
              // save response data to userInfo
              set({ userInfo });
              Swal.fire({
                title: "สำเร็จ!",
                text: "ลงชื่อเข้าใช้งานสำเร็จ",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }
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
              set({ userInfo: null });
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
  })
);
