import { useFormik } from "formik";
import { YearSchema } from "../../schemas/year";
import YearServices from "../../services/years/years.service";
import toast from "react-hot-toast";
import TextInputInModal from "./TexInputInModal";
const AddYear = ({ addDataSuccess }) => {
  const formik = useFormik({
    initialValues: {
      year: "",
    },
    validationSchema: YearSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      console.log("Submitting", actions);
      try {
        const res = await YearServices.createYear({
          year: Number(formik.values.year),
        });
        if (res.status === 201) {
          toast.success(res.data.message);
          addDataSuccess(); // แจ้งให้ component แม่ refresh รายการ ไม่งั้นก็ไม่เคย refresh ให้ผมเลยแมร่งเอ้ย

          document.getElementById("add_year").close(); // ปิด modal
        }
      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มปี"
        );
      }
      actions.resetForm();
    },
  });

  return (
    <div>
      <dialog id="add_year" className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">เพิ่มปีการศึกษา</h3>
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
         
            <div className="modal-action flex gap-4 justify-center">
              <button
                className="btn bg-red-400 text-white"
                type="button"
                //
                onClick={() => {formik.resetForm(); document.getElementById("add_year").close()}}
              >
                ยกเลิก
              </button>
              <button type="submit" className="btn bg-green-500 text-white">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddYear;
