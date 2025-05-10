import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";
import { PersonnelSchema } from "../../schemas/personnel";
import Userservices from "../../services/users/users.service";
import { useNavigate } from "react-router";
const AddPersonnel = () => {
  const navigate = useNavigate();
  const prefixOptions = ["นาย", "นาง", "นางสาว"];

  const formik = useFormik({
    initialValues: {
      prefix: "",
      first_name: "",
      last_name: "",
      user_id: "",
      phone: "",
    },
    validationSchema: PersonnelSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      console.log("Submitting", actions);
      try {
        const res = await Userservices.addTeacher(values);
        console.log("res === ", res);
        if (res.status === 201) {
          setTimeout(() => {
            document.getElementById("add_personnel").close();
            toast.success(res.data.message);
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log("เพิ่มผิดพลาดนะ", error.response.data.message);
      }
      actions.resetForm();
    },
  });

  return (
    <div>
      <dialog id="add_personnel" className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">เพิ่มข้อมูลบุคลากร</h3>

          <form onSubmit={formik.handleSubmit}>
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

              <TextInputInModal
                name="phone"
                maxLength={10}
                placeholder="เบอร์โทรศัพท์"
                disabled={false}
                value={formik.values.phone}
                onChange={formik.handleChange}
                label="เบอร์โทรศัพท์"
                error={formik.errors.phone}
                touched={formik.touched.phone}
                onBlur={formik.handleBlur}
              />

              <div className="flex gap-6 justify-center mt-4">
                <button type="submit" className="btn-green">
                  เพิ่มข้อมูล
                </button>
                <button
                  type="button"
                  className="btn-red"
                  onClick={() =>
                    document.getElementById("add_personnel").close()
                  }
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddPersonnel;
