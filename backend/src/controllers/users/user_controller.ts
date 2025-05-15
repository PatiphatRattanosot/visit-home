import UserModel from "../../models/users/user_model";
import { Elysia, t } from "elysia";

// ฟังก์ชัน get_users เพื่อดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
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

// ฟังก์ชัน deleteUser สำหรับลบผู้ใช้ตามอีเมล์
const delete_user = async (app: Elysia) =>
  app.delete(
    "/:email",
    async ({ params: { email }, set }) => {
      try {
        const user = await UserModel.findOneAndDelete({ email }, { new: true });
        if (!user) {
          set.status = 404;
          return { message: "ไม่พบผู้ใช้" };
        }
        const user_name = `${user.first_name} ${user.last_name}`;
        set.status = 200;
        return { message: `ลบผู้ใช้ ${user_name} สำเร็จ` };
      } catch (error) {
        set.status = 500;
        return { message: `เซิฟเวอร์ผิดพลาดไม่สามารถลบผู้ใช้ได้` };
      }
    },
    {
      detail: { tags: ["User"], description: "ลบข้อมูลผู้ใช้" },
      params: t.Object({
        email: t.String(),
      }),
    }
  );

// ฟังก์ชัน addAdminRole เพื่อเพิ่มสิทธิ์ Admin ให้กับผู้ใช้
const add_admin_role = async (app: Elysia) =>
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

// ฟังก์ชัน removeAdminRole เพื่อเอาสิทธิ์ Admin ออกจากผู้ใช้
const remove_admin_role = async (app: Elysia) =>
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
  delete_user,
  add_admin_role,
  remove_admin_role,
};

export default UserContrller;
