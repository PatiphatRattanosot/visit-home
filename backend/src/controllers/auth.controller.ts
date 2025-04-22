import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import UserModel from "../models/users/user.model";

// ฟังก์ชัน sign ใช้สำหรับสร้าง endpoint "/sign" เพื่อเข้าสู่ระบบ
const sign = async (app: Elysia) =>
  app
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET })) // ใช้ middleware สำหรับจัดการ JWT โดยใช้ secret key จาก environment variable
    .post(
      "/sign",
      async ({ body, set, jwt, cookie: { auth } }) => {
        try {
          const { email } = body;
          // ตรวจสอบว่ามี email หรือไม่
          if (!email) {
            set.status = 400; // ตั้งค่า HTTP status เป็น 400 (Bad Request)
            return { error: "ต้องการอีเมล" };
          }

          const user = await UserModel.findOne({ email: email }); // ค้นหาผู้ใช้ในฐานข้อมูลด้วย email

          // หากไม่พบผู้ใช้
          if (!user) {
            set.status = 404; // ตั้งค่า HTTP status เป็น 404 (Not Found)
            return { error: "ไม่พบอีเมลนี้ในระบบ" };
          }

          // สร้าง JWT token โดยใส่ข้อมูล email และ role ของผู้ใช้
          const token = await jwt.sign({ email, role: user.role.toString() });

          // ตั้งค่า cookie สำหรับการยืนยันตัวตน
          auth.set({
            value: token, // ใส่ token ที่สร้างขึ้น
            httpOnly: true, // ป้องกันการเข้าถึง cookie จาก JavaScript ฝั่ง client
            secure: process.env.NODE_ENV === "production", // ใช้ secure cookie ใน production
            maxAge: 24 * 60 * 60 * 1000, // อายุของ cookie (1 วัน)
            path: "/", // ใช้ cookie ได้ทุก path
          });

          set.status = 200; // ตั้งค่า HTTP status เป็น 200 (OK)
          return {
            message: "เข้าสู่ระบบสำเร็จ", // ส่งข้อความแจ้งเตือนสำเร็จ
            token, // ส่ง token กลับไป
            user, // ส่งข้อมูลผู้ใช้กลับไป
          };
        } catch (error) {
          // หากเกิดข้อผิดพลาด
          set.status = 500; // ตั้งค่า HTTP status เป็น 500 (Internal Server Error)
          console.log(error);
          return { message: "เซิฟเวอร์เกิดข้อผิดพลาดไม่สามารถเข้าสู่ระบบได้" };
        }
      },
      {
        body: t.Object({
          email: t.String(), // กำหนด schema ของ body ให้มี email เป็น string
        }),
        detail: {
          tags: ["Auth"],
          description: "เข้าใช้งานระบบ",
        },
      }
    );

const AuthController = {
  sign,
};

export default AuthController;
