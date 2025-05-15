import TeacherModel, { ITeacher } from "../../models/users/teacher_model"; // นำเข้าโมเดล TeacherModel และ ITeacher จากไฟล์ teacher_model.ts
import { Elysia, t } from "elysia";

// ฟังก์ชัน createTeacher ใช้สำหรับสร้าง endpoint "/teacher" เพิ่มข้อมูลครูที่ปรึกษา
const create_teacher = async (app: Elysia) =>
  app.post(
    "/",
    async ({ body, set }) => {
      try {
        const { first_name, last_name, prefix, user_id, phone } = body; // ดึงข้อมูลจาก body

        if (!user_id) {
          set.status = 400; // ตั้งค่า HTTP status เป็น 400 (Bad Request)
          return { message: "กรุณากรอกข้อมูลรหัสประจำครูที่ปรึกษา" };
        }

        const email = `bp${user_id}@bangpaeschool.ac.th`;
        // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
        if (!first_name || !last_name || !prefix) {
          set.status = 400; // ตั้งค่า HTTP status เป็น 400 (Bad Request)
          return { message: "กรุณากรอกข้อมูลให้ครบถ้วน" };
        }

        // ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลหรือไม่
        const existing_teacher = await TeacherModel.findOne({ user_id });
        if (existing_teacher) {
          set.status = 400; // ตั้งค่า HTTP status เป็น 400 (Bad Request)
          return { message: "มีข้อมูลครูที่ปรึกษานี้ในระบบแล้ว" };
        }
        // สร้างผู้ใช้ใหม่ในฐานข้อมูล
        const teacher = new TeacherModel({
          email,
          first_name,
          last_name,
          prefix,
          role: ["Teacher"],
          user_id,
          phone,
        });

        await teacher.save(); // บันทึกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
        set.status = 201; // ตั้งค่า HTTP status เป็น 201 (Created)
        return { message: "เพิ่มข้อมูลครูที่ปรึกษาเรียบร้อย", teacher }; // ส่งข้อความแจ้งเตือนสำเร็จพร้อมข้อมูลผู้ใช้
      } catch (error) {
        // console.log(error);
        set.status = 500; // ตั้งค่า HTTP status เป็น 500 (Internal Server Error)
        return {
          message: "เซิฟเวอร์เกิดข้อผิดพลาดไม่สามารถเพิ่มข้อมูลครูที่ปรึกษาได้",
        };
      }
    },
    {
      body: t.Object({
        first_name: t.String(),
        last_name: t.String(),
        prefix: t.String(),
        user_id: t.String(),
        phone: t.String(),
      }),
      detail: {
        tags: ["Teacher"],
        description: "เพิ่มข้อมูลผู้ที่ปรึกษา",
      },
    }
  );

// ฟังก์ชัน getTeacher ใช้สำหรับสร้าง endpoint "/" เพื่อดึงข้อมูลครูที่ปรึกษา
const get_teacher = async (app: Elysia) =>
  app.get(
    "/",
    async ({ set }) => {
      try {
        const teachers = await TeacherModel.find(); // ดึงข้อมูลครูที่ปรึกษาทั้งหมดจากฐานข้อมูล
        set.status = 200; // ตั้งค่า HTTP status เป็น 200 (OK)
        return { message: "ดึงข้อมูลครูที่ปรึกษาเรียบร้อย", teachers }; // ส่งข้อความแจ้งเตือนสำเร็จพร้อมข้อมูลครูที่ปรึกษา
      } catch (error) {
        set.status = 500; // ตั้งค่า HTTP status เป็น 500 (Internal Server Error)
        return {
          message: "เซิฟเวอร์เกิดข้อผิดพลาดไม่สามารถดึงข้อมูลครูที่ปรึกษาได้",
        };
      }
    },
    {
      detail: {
        tags: ["Teacher"],
        description: "ดึงข้อมูลครูที่ปรึกษา",
      },
    }
  );

// ฟังก์ชัน getTeacherById ใช้สำหรับสร้าง endpoint "/:user_id" เพื่อดึงข้อมูลครูที่ปรึกษาตาม user_id
const get_teacher_by_id = async (app: Elysia) =>
  app.get(
    "/by_id/:_id",
    async ({ params: { _id }, set }) => {
      try {
        const teacher = await TeacherModel.findOne({
          _id,
        });
        if (!teacher) {
          set.status = 404; // ตั้งค่า HTTP status เป็น 404 (Not Found)
          return { message: "ไม่พบข้อมูลครูที่ปรึกษานี้ในระบบ" };
        }
        set.status = 200; // ตั้งค่า HTTP status เป็น 200 (OK)
        return { message: "ดึงข้อมูลครูที่ปรึกษาเรียบร้อย", teacher }; // ส่งข้อความแจ้งเตือนสำเร็จพร้อมข้อมูลครูที่ปรึกษา
      } catch (error) {
        set.status = 500; // ตั้งค่า HTTP status เป็น 500 (Internal Server Error)
        return {
          message: "เซิฟเวอร์เกิดข้อผิดพลาดไม่สามารถดึงข้อมูลครูที่ปรึกษาได้",
        };
      }
    },
    {
      detail: {
        tags: ["Teacher"],
        description: "ดึงข้อมูลครูที่ปรึกษา",
      },
    }
  );

const update_teacher = async (app: Elysia) =>
  app.put(
    "/",
    async ({ body, set }) => {
      try {
        const { _id, first_name, last_name, prefix, phone, status } = body;
        const teacher = (await TeacherModel.findByIdAndUpdate(_id)) as ITeacher; // ค้นหาครูที่ปรึกษาในฐานข้อมูลด้วย _id
        if (!teacher) {
          set.status = 404; // ตั้งค่า HTTP status เป็น 404 (Not Found)
          return { message: "ไม่พบข้อมูลครูที่ปรึกษานี้ในระบบ" };
        }
        // อัปเดตข้อมูลครูที่ปรึกษา
        teacher.first_name = first_name;
        teacher.last_name = last_name;
        teacher.prefix = prefix;
        teacher.phone = phone;
        teacher.status = status; 

        await teacher.save(); // บันทึกข้อมูลที่อัปเดตลงในฐานข้อมูล
        set.status = 200; // ตั้งค่า HTTP status เป็น 200 (OK)
        return { message: "อัพเดทข้อมูลครูที่ปรึกษาเรียบร้อย", teacher };
      } catch (error) {
        set.status = 500; // ตั้งค่า HTTP status เป็น 500 (Internal Server Error)
        return {
          message:
            "เซิฟเวอร์เกิดข้อผิดพลาดไม่สามารถอัพเดทข้อมูลครูที่ปรึกษาได้",
        };
      }
    },
    {
      detail: {
        tags: ["Teacher"],
        description: "อัพเดทข้อมูลครูที่ปรึกษา",
      },
      body: t.Object({
        _id: t.String(),
        first_name: t.String(),
        last_name: t.String(),
        prefix: t.String(),
        phone: t.String(),
        status: t.String(),
      }),
    }
  );

const TeacherController = {
  create_teacher,
  get_teacher_by_id,
  get_teacher,
  update_teacher,
};
export default TeacherController;
