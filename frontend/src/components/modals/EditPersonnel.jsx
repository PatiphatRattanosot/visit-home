import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Userservices from "../../services/users/users.service";
import { PersonnelSchema } from "../../schemas/personnelUpdate";
import { toast } from "react-hot-toast";

import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";

const EditPersonnel = ({ id, onSuccesUpdatePerson }) => {
  const [update, setUpdate] = useState(0);
  const [teacher, setTeacher] = useState(null); // เพิ่ม state นี้ไว้ข้างบน

  const prefixOptions = ["นาย", "นาง", "นางสาว"];
  const statusOptions = ["ลาออก", "เกษียณ", "รับราชการ"];

  const formik = useFormik({
    initialValues: {
      prefix: "",
      first_name: "",
      last_name: "",
      phone: "",
      status: "",
    },

    validationSchema: PersonnelSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      try {
        //ใส่ปีกกาครอบพารามิเตอร์ values กับ _id:id ถ้าไม่อยากแก้ 4 วัน เหมือนที่ผ่านมา แค้นมาก
        const response = await Userservices.updateTeacher({
          ...values,
          _id: id,
        });
        console.log("response: ", response);

        if (response.status === 200) {
          toast.success(response.data.message);
          onSuccesUpdatePerson();
          // ตั้งบอก useEffect เมื่อมีการเปลี่ยนแปลงค่าข้อมูล
          setUpdate((prev) => prev + 1);

          document.getElementById(`edit_personnel_${id}`).close();
        }
      } catch (error) {
        console.log("error:", error);
        toast.error(error.response.data.message);
      }
      actions.resetForm();
    },
  });

  useEffect(() => {
    const getPersonnelById = async () => {
      try {
        const response = await Userservices.getTeacherById(id);

        if (response.status === 200) {
          const teacher = response.data.teacher;
          setTeacher(teacher);
          formik.setValues({
            prefix: teacher.prefix,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            phone: teacher.phone,
            status: teacher.status,
          });
        }
      } catch (error) {
        console.log("error:", error);
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล!");
      }
    };
    getPersonnelById();
  }, [id, update]);
  return (
    <div>
      <dialog id={`edit_personnel_${id}`} className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">แก้ไขข้อมูลบุคลากร</h3>
          <p className="text-base m-2">{teacher ? `${teacher.first_name} ${teacher.last_name}` : ""}</p>

          <form onSubmit={formik.handleSubmit} className="mt-2">
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

            <div className="modal-action flex justify-center">
              <div className="flex gap-6 ">
                <button type="submit" className="btn-green">
                  บันทึก
                </button>
                <button
                  type="button"
                  className="btn-red"
                  onClick={() => {
                    document.getElementById(`edit_personnel_${id}`).close();
                  }}
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

export default EditPersonnel;
