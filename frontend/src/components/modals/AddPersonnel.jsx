import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { PersonnelSchema } from "../../schemas/personnel";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";

import Userservices from "../../services/user.service";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
const AddPersonnel = () => {
  const navigate = useNavigate();

  const prefixOptions = ["นาย", "นาง", "นางสาว"];
  const rankOptions = ["เจ้าหน้าที่ฝ่ายทะเบียน", "ครูที่ปรึกษา"];
  const statusOptions = ["ลาออก", "เกษียณ", "รับราชการ"];

  const formik = useFormik({
    initialValues: {
      prefix: "",
      first_name: "",
      last_name: "",
      user_id: "",
      rank: "",
      phone: "",
      status: "รับราชการ",
    },
    validationSchema: PersonnelSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      console.log("Submitting", actions);
      try {
        const response = await Userservices.addUser(values);
        toast.success("เพิ่มข้อมูลบุคลากรเรียบร้อยแล้ว!");
        document.getElementById("add_personnel").close();

        navigate("/admin/personnel");
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล!");
      }
      actions.resetForm();
    },
  });

  return (
    <div>
      <dialog id="add_personnel" className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">เพิ่มข้อมูลบุคลากร</h3>

          <div className="flex flex-col items-center justify-center space-y-2">
            <SelectInputInModal
              name="prefix"
              value={formik.values.prefix}
              onChange={formik.handleChange}
              label="คำนำหน้า"
              disabled={false}
              defaultOpt="คำนำหน้า"
              options={prefixOptions}
              error={formik.errors.prefix}
              touched={formik.touched.prefix}
              onBlur={formik.handleBlur}
              className="w-64 md:w-72"
            />

            <TextInputInModal
              name="first_name"
              placeholder="ชื่อ"
              disabled={false}
              value={formik.values.first_name}
              onChange={formik.handleChange}
              label="ชื่อ"
              error={formik.errors.first_name}
              touched={formik.touched.first_name}
              onBlur={formik.handleBlur}
            />

            <TextInputInModal
              name="last_name"
              placeholder="นามสกุล"
              disabled={false}
              value={formik.values.last_name}
              onChange={formik.handleChange}
              label="นามสกุล"
              error={formik.errors.last_name}
              touched={formik.touched.last_name}
              onBlur={formik.handleBlur}
            />

            <TextInputInModal
              name="user_id"
              placeholder="เลขที่ประจำตัวบุคลากร"
              disabled={false}
              value={formik.values.user_id}
              onChange={formik.handleChange}
              label="เลขที่ประจำตัวบุคลากร"
              error={formik.errors.user_id}
              touched={formik.touched.user_id}
              onBlur={formik.handleBlur}
            />

            <SelectInputInModal
              name="rank"
              value={formik.values.rank}
              onChange={formik.handleChange}
              label="ตำแหน่ง"
              disabled={false}
              defaultOpt="ตำแหน่ง"
              options={rankOptions}
              error={formik.errors.rank}
              touched={formik.touched.rank}
              onBlur={formik.handleBlur}
              className="w-64 md:w-72"
            />

            <TextInputInModal
              name="phone"
              placeholder="เบอร์โทรศัพท์"
              disabled={false}
              value={formik.values.phone}
              onChange={formik.handleChange}
              label="เบอร์โทรศัพท์"
              error={formik.errors.phone}
              touched={formik.touched.phone}
              onBlur={formik.handleBlur}
            />

            <SelectInputInModal
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              label="สถานะ"
              disabled={false}
              options={statusOptions}
              error={formik.errors.status}
              touched={formik.touched.status}
              onBlur={formik.handleBlur}
              className="w-64 md:w-72"
            />
          </div>

          <div className="modal-action">
            <form onSubmit={formik.handleSubmit} method="dialog mt-2">
              <div className="flex gap-6">
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="btn-green"
                >
                  บันทึก
                </button>
                <button className="btn-red">ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddPersonnel;
