import { Elysia, t } from "elysia";
import YearModel from "../models/year_model";

const create_year = async (app: Elysia) =>
  app.post(
    "/",
    async ({ body, set }) => {
      try {
        const { year } = body;
        // ตรวจสอบว่ามี year หรือไม่
        if (!year) {
          set.status = 400; // ตั้งค่า HTTP status เป็น 400 (Bad Request)
          return { message: "ต้องการปีการศึกษา" };
        }

        // ตรวจสอบว่ามีปีการศึกษาหรือไม่ ถ้าไม่มีให้สร้างใหม่
        const year_data = await YearModel.find();
        if ((year_data.length = 0)) {
          const new_year = new YearModel({ year });
          await new_year.save();
          set.status = 201; // ตั้งค่า HTTP status เป็น 201 (Created)
          return { message: "สร้างปีการศึกษาสำเร็จ" };
        }
        // ถ้ามีปีการศึกษาแล้ว ให้เพิ่มปีการศึกษาใหม่ที่เป็นปีถัดไป
        const existing_year = await YearModel.findOne({ year });
        if (existing_year) {
          set.status = 400; // ตั้งค่า HTTP status เป็น 400 (Bad Request)
          return { message: "ปีการศึกษานี้มีอยู่แล้ว" };
        }
      } catch (error) {}
    },
    {
      body: t.Object({
        year: t.Number(), // ปีการศึกษา
      }),
      detail: {
        tags: ["Year"],
        description: "สร้างปีการศึกษาแรก",
      },
    }
  );

const auto_create_year = async (app: Elysia) =>
  app.post(
    "/auto",
    async ({ body, set }) => {
      try {
        const { year } = body;
        // ตรวจสอบว่ามี year หรือไม่
        if (!year) {
          set.status = 400; // ตั้งค่า HTTP status เป็น 400 (Bad Request)
          return { message: "ต้องการปีการศึกษา" };
        }

        // ตรวจสอบว่ามีปีการศึกษาหรือไม่ ถ้าไม่มีให้สร้างใหม่
        const year_data = await YearModel.find();
        if ((year_data.length = 0)) {
          const new_year = new YearModel({ year });
          await new_year.save();
          set.status = 201; // ตั้งค่า HTTP status เป็น 201 (Created)
          return { message: `สร้างปีการศึกษา ${year} สำเร็จ` };
        }
        // ถ้ามีปีการศึกษาแล้ว ให้เพิ่มปีการศึกษาใหม่ที่เป็นปีถัดไป
        const existing_year = await YearModel.findOne({ year });
        if (existing_year) {
          set.status = 400; // ตั้งค่า HTTP status เป็น 400 (Bad Request)
          return { message: `ปีการศึกษา ${year} มีอยู่แล้ว ` };
        }
        const new_year = new YearModel({ year: year + 1 });
        await new_year.save();
        set.status = 201; // ตั้งค่า HTTP status เป็น 201 (Created)
        return { message: `สร้างปีการศึกษา ${year + 1} สำเร็จ` };
      } catch (error) {}
    },
    {
      body: t.Object({
        year: t.Number(), // ปีการศึกษา
      }),
      detail: {
        tags: ["Year"],
        description: "สรร้างปีการศึกษาอัตโนมัติ",
      },
    }
  );

const YearController = {
  create_year,
  auto_create_year,
};

export default YearController;
