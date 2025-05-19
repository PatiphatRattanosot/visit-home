import { YearSchema } from "../../schemas/year";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import YearServices from "../../services/years/years.service";
import TextInputInModal from "./TexInputInModal";
import toast from "react-hot-toast";

const EditYear = ({ year, onUpdateSuccess }) => {
  console.log(year);

  // ฟังก์ชันเรียกปีการศึกษาผ่าน id
  useEffect(() => {
    const getYearById = async () => {
      try {
        const response = await YearServices.getYearById(year._id);
        if (response.status === 200) {
          formik.setValues({
            year: year.year,
          });
        }
      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.data?.message || "เกิดข้อผิดพลาดในการโหลดปีการศึกษา"
        );
      }
    };
    getYearById();
  }, [year]);

  const formik = useFormik({
    initialValues: {
      year: year.year,
    },
    validationSchema: YearSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      console.log("Submitting", actions);
      try {
        //ก้อน object ที่จะส่งไป
        const response = await YearServices.updateYear({
          year_id: year._id,

          // Number() เป็นฟังก์ชั่นที่เอาไว้เปลี่ยน type ของข้อมูลเป็น integer หรือ ตัวเลข
          new_year: Number(values.year),
        });

        console.log(response);

        if (response.status === 200) {
          toast.success("แก้ไขปีการศึกษาเรียบร้อยแล้ว");

          document.getElementById(`Edit_year_${year._id}`).close();
          onUpdateSuccess(); // แจ้งให้ component แม่ refresh รายการ
        }
      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไขปีการศึกษา"
        );
      }
      actions.resetForm();
    },
  });
  // ฟังก์ชันสำหรับแก้ไขปีการศึกษา

  return (
    <div>
      <dialog id={`Edit_year_${year._id}`} className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">แก้ไขปีการศึกษา</h3>
          <form
            onSubmit={formik.handleSubmit}
            method="dialog"
            className="flex flex-col gap-4 mt-4"
          >
            <TextInputInModal
              type="number"
              name="year"
              placeholder="ปีการศึกษา เช่น 2566"
              disabled={false}
              value={formik.values.year}
              onChange={formik.handleChange}
              label="ปีการศึกษา"
              error={formik.errors.year}
              touched={formik.touched.year}
              onBlur={formik.handleBlur}
            />

            <div className="modal-action flex justify-center gap-4">
              <button type="submit" className="btn bg-green-500 text-white">
                บันทึก
              </button>
              <button
                type="button"
                className="btn bg-red-400 text-white"
                onClick={() => {
                  formik.resetForm();
                  document.getElementById(`Edit_year_${year._id}`).close();
                }}
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EditYear;
