import UserModel from "../../models/users/user.model";
import { Elysia, t } from "elysia";

const get_users = async (app: Elysia) =>
  app.get(
    "/",
    async ({ set, cookie: { auth } }) => {
      try {
        const users = await UserModel.find();
        if (!users) {
          set.status = 200;
          return { message: "ไม่พบข้อมูลผู้ใช้", users: [] };
        }
        set.status = 200;
        return { message: "ดึงข้อมูลผู้ใช้สำเร็จ", users };
      } catch (error) {
        set.status = 500;
        return { message: "เซิฟเวอร์ผิดพลาดในการดึงข้อมูลผู้ใช้" };
      }
    },
    {
      detail: { tags: ["User"], description: "ดึงข้อมูลผู้ใช้" },
    }
  );

const addAdminRole = async (app: Elysia) =>
  app.patch(
    "/add/:email",
    async ({ params: { email }, set }) => {
      try {
        if (!email) {
          set.status = 400;
          return { message: "กรุณากรอกอีเมล์" };
        }
        const teacher = await UserModel.findOne({
          email,
        });

        if (!teacher) {
          set.status = 404;
          return { message: "ไม่พบครูที่ปรึกษา" };
        }
        if (teacher.role.includes("Admin")) {
          set.status = 200;
          return { message: "ครูที่ปรึกษาเป็นผู้ดูแลระบบอยู่แล้ว" };
        }

        teacher.role.push("Admin");
        await teacher.save();

        set.status = 200;
        return {
          message: `เพิ่มสิทธ์ผู้ดูแลให้ ${teacher.prefix} ${teacher.first_name} สำเร็จ`,
        };
      } catch (error) {
        console.error(error);
        set.status = 500;
        return { message: "เซิฟเวอร์ผิดพลาดไม่สามารถเพิ่มผู้ดูแลระบบได้" };
      }
    },
    {
      detail: {
        tags: ["User"],
        description: "เพิ่มสิทธิ์ Admin ให้กับผู้ใช้",
      },
    }
  );

const removeAdminRole = async (app: Elysia) =>
  app.patch(
    "/remove/:email",
    async ({ params: { email }, set }) => {
      try {
        if (!email) {
          set.status = 400;
          return { message: "กรุณากรอกอีเมล์" };
        }
        const teacher = await UserModel.findOne({ email });
        if (!teacher) {
          set.status = 404;
          return { message: "ไม่พบครูที่ปรึกษา" };
        }
        teacher.role = teacher.role.filter((r) => r !== "Admin");
        await teacher.save();
        set.status = 200;
        return {
          message: `ลบสิทธ์ผู้ดูแลให้ ${teacher.prefix}${teacher.first_name} สำเร็จ`,
        };
      } catch (error) {
        set.status = 500;
        return { message: "เซิฟเวอร์ผิดพลาดไม่สามารถลบผู้ดูแลระบบได้" };
      }
    },
    {
      detail: {
        tags: ["User"],
        description: "ลบสิทธิ์ Admin ให้กับผู้ใช้",
      },
    }
  );

const UserContrller = {
  get_users,
  addAdminRole,
  removeAdminRole,
};

export default UserContrller;
