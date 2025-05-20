import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router";
import { useAuthStore } from "../../../stores/auth.store";
import Stepper from "../../../components/Stepper";
import CheckboxInput from "../../../components/CheckboxInput";

const AddBehaviorForm = () => {
  const { userInfo } = useAuthStore();

  const {
    initialValues,
    values,
    setValues,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      health_risk: [],
      welfare_and_safety: [],
    },
    onSubmit: async (values, actions) => {
      console.log(values);
      actions.resetForm();
    },
  });

  const { year } = useParams();
  const navigate = useNavigate();
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
          ข้อมูลการเยี่ยมบ้านของ{" "}
          <span className="text-gray-600">{`${userInfo?.prefix} ${userInfo?.first_name} ${userInfo?.last_name}`}</span>
        </h3>

        <div className="flex justify-center">
          <Stepper step={4} path={stepperPath} />
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold text-gray-600 text-center mt-6 mb-4">
            พฤติกรรมและความเสี่ยง
          </h3>
          <div className="grid grid-cols-1 gap-6 mt-8">
            {/* สุขภาพ */}
            <CheckboxInput
              label={"ด้านสุขภาพ (ตอบได้มากกว่า 1 ข้อ)"}
              options={[
                "ร่างกายแข็งแรง",
                "ร่างกายไม่แข็งแรง",
                "สมรรถภาพทางร่างกายต่ำ",
                "มีโรคประจำตัวหรือเจ็บป่วยบ่อย",
                "ป่วยเป็นโรคร้ายแรง/เรื้อรัง",
                "มีภาวะทุพโภชนาการ",
              ]}
              name={"health_risk"}
              value={values.health_risk}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.health_risk}
              touched={touched.health_risk}
              grid="grid-cols-2"
            />
            {/* สวัสดิการหรือความปลอดภัย */}
            <CheckboxInput
              label={"สวัสดิการหรือความปลอดภัย (ตอบได้มากกว่า 1 ข้อ)"}
              options={[
                "ไม่มีความเสี่ยงใดๆ",
                "พ่อแม่แยกทางกัน หรือ แต่งงานใหม่",
                "มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้าย",
                "บุคคลในครอบครัวเล่นการพนัน",
                "ไม่มีผู้ดูแล",
                "ถูกทารุณ/ทำร้ายจากบุคคลในครอบครัว/เพื่อนบ้าน",
                "พักอาศัยอยู่ในชุมชนแออัดหรือใกล้แหล่งมั่วสุม/สถานเริงรมย์",
                "เล่นการพนัน",
                "บุคคลในครอบครัวติดสารเสพติดแรง/เรื้อรัง/ติดต่อ",
                "มีความขัดแย้ง/ทะเลาะกันในครอบครัว",
                "ความขัดแย้งและมีการใช้ความรุนแรงในครอบครัว",
                "ถูกล่วงละเมิดทางเพศ",
              ]}
              name={"welfare_and_safety"}
              value={values.welfare_and_safety}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.welfare_and_safety}
              touched={touched.welfare_and_safety}
              grid="grid-cols-2"
            />
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn-gray w-1/2"
              onClick={() => {
                setValues(initialValues);
                navigate(`/student/visit-info/${year}/family-status/add`);
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

export default AddBehaviorForm;
