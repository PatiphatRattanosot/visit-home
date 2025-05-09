import RadioInput from "../../../components/RadioInput";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import { useAuthStore } from "../../../stores/auth.store";
import Stepper from "../../../components/Stepper";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

const AddRelationForm = () => {
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  // stepper path
  const stepperPath = {
    stepOne: `/student/self-info/add`,
    stepTwo: `/student/relation/add`,
    stepThree: `/student/family-status/add`,
    stepFour: `/student/behavior/add`,
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    initialValues,
  } = useFormik({
    initialValues: {
      family_member: 0,
      family_time: 0,
      father_relation: "สนิทสนม",
      mother_relation: "สนิทสนม",
      brother_relation: "สนิทสนม",
      sister_relation: "สนิทสนม",
      grand_parent_relation: "สนิทสนม",
      relatives_relation: "สนิทสนม",
      other_relative: "",
      other_relation: "ไม่มี",
      when_student_alone: "",
      total_household_income: 0,
      daily_total_to_school: 0,
      received_daily_from: "",
      student_part_time: "",
      student_income: 0,
      support_from_school: "",
      support_from_organize: "",
      parent_concern: "",
    },
  });

  const relationOpts = ["สนิทสนม", "เฉยๆ", "ห่างเหิน", "ขัดแย้ง", "ไม่มี"];
  const studentAloneOpts = ["ญาติ", "เพื่อนบ้าน", "นักเรียนอยู่บ้านด้วยตนเอง"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-center text-xl font-bold">
          ข้อมูลส่วนตัวของ{" "}
          <span className="text-gray-600">{`${userInfo?.prefix} ${userInfo?.first_name} ${userInfo?.last_name}`}</span>
        </h3>

        <div className="flex justify-center">
          <Stepper step={2} path={stepperPath} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* จำนวนสมาชิกในครอบครัว */}
            <TextInput
              label={"สมาชิกในครอบครัวมีเวลาอยู่ร่วมกันกี่ชั่วโมงต่อวัน"}
              name={"family_time"}
              value={values.family_time}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.family_time}
              touched={touched.family_time}
              placeholder={"กรอกเวลาที่ใช้ร่วมกัน"}
              type="number"
            />
            {/* เวลาร่วมกัน */}
            <TextInput
              label={"จำนวนสมาชิกในครัวเรือน (รวมตัวนักเรียนด้วย)"}
              name={"family_member"}
              value={values.family_member}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.family_member}
              touched={touched.family_member}
              placeholder={"กรอกจำนวนสมาชิก"}
              type="number"
            />
            {/* ความสัมพันธ์ บิดา */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างบิดา"}
              options={relationOpts}
              className="w-full"
              name={"father_relation"}
              value={values.father_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.father_relation}
              touched={touched.father_relation}
            />
            {/* ความสัมพันธ์ มารดา */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างมารดา"}
              options={relationOpts}
              className="w-full"
              name={"mother_relation"}
              value={values.mother_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.mother_relation}
              touched={touched.mother_relation}
            />
            {/* ความสัมพันธ์ พี่/น้องชาย */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างพี่ชาย,น้องชาย"}
              options={relationOpts}
              className="w-full"
              name={"brother_relation"}
              value={values.brother_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.brother_relation}
              touched={touched.brother_relation}
            />
            {/* ความสัมพันธ์ พี่/น้องสาว */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างพี่สาว,น้องสาว"}
              options={relationOpts}
              className="w-full"
              name={"sister_relation"}
              value={values.sister_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.sister_relation}
              touched={touched.sister_relation}
            />
            {/* ความสัมพันธ์ ปู่/ย่า/ตา/ยาย */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างปู่,ย่า,ตา,ยาย"}
              options={relationOpts}
              className="w-full"
              name={"grand_parent_relation"}
              value={values.grand_parent_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.grand_parent_relation}
              touched={touched.grand_parent_relation}
            />
            {/* ความสัมพันธ์ ญาติๆ */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างญาติ"}
              options={relationOpts}
              className="w-full"
              name={"relatives_relation"}
              value={values.relatives_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.relatives_relation}
              touched={touched.relatives_relation}
            />
            {/* ความสัมพันธ์อื่นๆ */}
            <TextInput
              label={"คนอื่นๆ"}
              placeholder={"กรอกบุคคลที่รู้จัก"}
              name={"other_relative"}
              value={values.other_relative}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.other_relative}
              touched={touched.other_relative}
            />
            {/* ความสัมพันธ์อื่นๆ */}
            <SelectInput
              label={"ความสัมพันธ์กับคนอื่นๆ"}
              options={relationOpts}
              className="w-full"
              name={"other_relation"}
              value={values.other_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.other_relation}
              touched={touched.other_relation}
            />
            {/* เวลาผู้ปกครองไม่อยู่ */}
            <div className="md:col-span-2">
              <RadioInput
                label={
                  "กรณีที่ผู้ปกครองไม่อยู่บ้าน ฝากเด็กนักเรียนอยู่บ้านกับใคร"
                }
                options={studentAloneOpts}
                name={"when_student_alone"}
                value={values.when_student_alone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.when_student_alone}
                touched={touched.when_student_alone}
                extraOpt
              />
            </div>
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn-gray w-1/2"
              onClick={() => {
                setValues(initialValues);
                navigate("/student/self-info/add");
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

export default AddRelationForm;
