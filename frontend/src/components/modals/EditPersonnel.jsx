import { useFormik } from "formik";
import Userservices from "../../services/users/users.service";
import { PersonnelSchema } from "../../schemas/personnel";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";



const EditPersonnel = ({ id }) => {
  const navigate = useNavigate();

  const prefixOptions = ["นาย", "นาง", "นางสาว"];
  const statusOptions = ["ลาออก", "เกษียณ", "รับราชการ"];

  const formik = useFormik({
    initialValues: {
      prefix: "",
      first_name: "",
      last_name: "",
      user_id: "",
      phone: "",
      status: "รับราชการ",
    },
    validationSchema: PersonnelSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      console.log("Submitting", actions);
      try {
        const response = await Userservices.updateTeacher(_id, values);
        toast.success("แก้ไขข้อมูลบุคลากรเรียบร้อยแล้ว!");
        document.getElementById(`edit_personnel_${id}`).close();
        setPersonnel({
          first_name: "",
          last_name: "",
          user_id: "",
          rank: "",
          prefix: "",
          status: "",
        });
        navigate("/admin/personnel");
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล!");
      }
      actions.resetForm();
    },
  });

  useEffect(() => {
    const getPersonnelById = async () => {
      try {
        const response = await Userservices.getUserById(id);
        if (response.status === 200) {
          formik.setValues({
            prefix: response.data.prefix,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            user_id: response.data.user_id,
            rank: response.data.rank,
            phone: response.data.phone,
            status: response.data.status,
          });
          setPersonnel(response.data);

          console.log(response);
        }
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล!");
      }
    };
    getPersonnelById();
  }, [id]);
  return (
    <div>
      <dialog id={`edit_personnel_${id}`} className="modal">
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
                <button disabled={formik.isSubmitting} type="submit" className="btn-green">
                บันทึก
              </button>
              <button
                  type="button"
                  className="btn-red"
                  onClick={() =>
                    document.getElementById(`edit_personnel_${id}`).close()
                  }
                >
                  ยกเลิก
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditPersonnel;
