import { useFormik } from "formik";
import Stepper from "../../../components/Stepper";
import { useAuthStore } from "../../../stores/auth.store";
import { useNavigate, useParams } from "react-router";
import CheckboxInput from "../../../components/CheckboxInput";
import RadioInput from "../../../components/RadioInput";
import TextInput from "../../../components/TextInput";
import { FamilyStatusSchema } from "../../../schemas/familyStatus";

const AddFamilyStatusForm = () => {
  const { userInfo } = useAuthStore();
  const { year } = useParams();
  const navigate = useNavigate();

  const {
    initialValues,
    setValues,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      household_burdens: [],
      housing_type: "",
      housing_condition: "",
      family_vehicles: [],
      owned_land: 0,
      rented_land: 0,
    },
    validationSchema: FamilyStatusSchema,
  });
  console.log(values);

  // stepper path
  const stepperPath = {
    stepOne: `/student/visit-info/${year}/self-info/add`,
    stepTwo: `/student/visit-info/${year}/relation/add`,
    stepThree: `/student/visit-info/${year}/family-status/add`,
    stepFour: `/student/visit-info/${year}/behavior/add`,
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-center text-xl font-bold">
          ข้อมูลส่วนตัวของ{" "}
          <span className="text-gray-600">{`${userInfo?.prefix} ${userInfo?.first_name} ${userInfo?.last_name}`}</span>
        </h3>

        <div className="flex justify-center">
          <Stepper step={3} path={stepperPath} />
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold text-gray-600 text-center mt-6 mb-4">
            สถานะของครัวเรือน
          </h3>
          <div className="grid grid-cols-1 gap-6 mt-8">
            {/* ครัวเรือนมีภาระพึ่งพิง */}
            <CheckboxInput
              label={"ครัวเรือนมีภาระพึ่งพิง (ตอบได้มากกว่า 1 ข้อ)"}
              name={"household_burdens"}
              value={values.household_burdens}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.household_burdens}
              touched={touched.household_burdens}
              options={[
                "มีคนพิการ",
                "มีผู้สูงอายุเกิน 60 ปี",
                "เป็นพ่อ/แม่เลี้ยงเดี่ยว",
                "มีคนอายุ 15-65 ปี ว่างงาน (ที่ไม่ใช่นักเรียน/นักศึกษา)",
              ]}
            />
            {/* ประเภทที่อยู่อาศัย */}
            <RadioInput
              label={"ประเภทที่อยู่อาศัย"}
              name={"housing_type"}
              value={values.housing_type}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.housing_type}
              touched={touched.housing_type}
              options={["บ้านของตนเอง", "บ้านเช่า", "อาศัยอยู่กับผู้อื่น"]}
              grid="grid-cols-1"
            />
            {/* สภาพที่อยู่อาศัย */}
            <RadioInput
              label={"สภาพที่อยู่อาศัย"}
              name={"housing_condition"}
              value={values.housing_condition}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.housing_condition}
              touched={touched.housing_condition}
              options={[
                "สภาพบ้านชำรุดทรุดโทรม หรือ บ้านทำจากวัสดุพื้นบ้าน เช่น ไม้ไผ่ ใบจากหรือวัสดุเหลือใช้",
                "ไม่มีห้องส้วมในที่อยู่อาศัยและบริเวณ",
                "สภาพบ้านปกติ",
              ]}
              extraOpt
              grid="grid-cols-1"
            />
            {/* ยานพาหนะของครัวเรือน */}
            <CheckboxInput
              label={"ยานพาหนะของครอบครัว (ตอบได้มากกว่า 1 ข้อ)"}
              name={"family_vehicles"}
              value={values.family_vehicles}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.family_vehicles}
              touched={touched.family_vehicles}
              options={[
                "รถมอเตอร์ไซค์",
                "รถยนต์ส่วนบุคคล",
                "รถบรรทุกเล็ก/รถตู้",
                "รถไถ/เกี่ยวข้าว/รถอีแต๋น/รถอื่นๆ ประเภทเดียวกัน",
              ]}
            />
            {/* ที่ดินทำกิน */}
            <div>
              <label
                htmlFor="farmland"
                className="text-sm font-bold text-gray-700"
              >
                เป็นเกษตรกรมีที่ดินทำกิน (รวมเช่า)
              </label>
              <div id="farmland" className="flex flex-col mt-3 gap-3">
                <TextInput
                  label={"เป็นเจ้าของจำนวน (ไร่)"}
                  name={"owned_land"}
                  value={values.owned_land}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.owned_land}
                  touched={touched.owned_land}
                  type="number"
                  className="w-2/6"
                />
                <TextInput
                  label={"เช่าจำนวน (ไร่)"}
                  name={"rented_land"}
                  value={values.rented_land}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.rented_land}
                  touched={touched.rented_land}
                  type="number"
                  className="w-2/6"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn-gray w-1/2"
              onClick={() => {
                setValues(initialValues);
                navigate(`/student/visit-info/${year}/relation/add`);
              }}
            >
              ก่อนหน้า
            </button>
            <button type="submit" className="btn-gray w-1/2">
              ถัดไป
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFamilyStatusForm;
