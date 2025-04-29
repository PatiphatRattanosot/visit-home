import { useState } from "react";
import TextInput from "../../../components/TextInput";
import StudentPicture from "../../../components/students/StudentPicture";
import Stepper from "../../../components/Stepper";
import { useAuthStore } from "../../../stores/auth.store";

const AddSelfInfoForm = () => {
  const { userInfo } = useAuthStore();
  const [selfInfo, setSelfInfo] = useState({
    father_first_name: "",
    father_last_name: "",
    father_phone: "",
    father_job: "",
    mother_first_name: "",
    mother_last_name: "",
    mother_phone: "",
    mother_job: "",
    family_relation_status: "",
    parent_first_name: "",
    parent_last_name: "",
    parent_phone: "",
    parent_job: "",
    lat: "",
    lng: "",
  });

  const [prefixData, setPrefixData] = useState({
    prefix0: "",
    prefix4: "",
    prefix8: "",
  });

  const [image, setImage] = useState(null);

  const prefixFields = [0, 4, 8];

  const form = [
    {
      name: "father_first_name",
      value: selfInfo.father_first_name,
      placeholder: "ชื่อของบิดา",
      disabled: false,
      label: "ชื่อของบิดา",
    },
    {
      name: "father_last_name",
      value: selfInfo.father_last_name,
      placeholder: "นามสกุลของบิดา",
      disabled: false,
      label: "นามสกุลของบิดา",
    },
    {
      name: "father_phone",
      value: selfInfo.father_phone,
      placeholder: "เบอร์โทร",
      disabled: false,
      label: "เบอร์โทร",
    },
    {
      name: "father_job",
      value: selfInfo.father_job,
      placeholder: "อาชีพ",
      disabled: false,
      label: "อาชีพ",
    },
    {
      name: "mother_first_name",
      value: selfInfo.mother_first_name,
      placeholder: "ชื่อของมารดา",
      disabled: false,
      label: "ชื่อของมารดา",
    },
    {
      name: "mother_last_name",
      value: selfInfo.mother_last_name,
      placeholder: "นามสกุลของมารดา",
      disabled: false,
      label: "นามสกุลของมารดา",
    },
    {
      name: "mother_phone",
      value: selfInfo.mother_phone,
      placeholder: "เบอร์โทร",
      disabled: false,
      label: "เบอร์โทร",
    },
    {
      name: "mother_job",
      value: selfInfo.mother_job,
      placeholder: "อาชีพ",
      disabled: false,
      label: "อาชีพ",
    },
    {
      name: "parent_first_name",
      value: selfInfo.parent_first_name,
      placeholder: "ชื่อของผู้ปกครอง",
      disabled: false,
      label: "ชื่อของผู้ปกครอง",
    },
    {
      name: "parent_last_name",
      value: selfInfo.parent_last_name,
      placeholder: "นามสกุลของผู้ปกครอง",
      disabled: false,
      label: "นามสกุลของผู้ปกครอง",
    },
    {
      name: "parent_phone",
      value: selfInfo.parent_phone,
      placeholder: "เบอร์โทร",
      disabled: false,
      label: "เบอร์โทร",
    },
    {
      name: "parent_job",
      value: selfInfo.parent_job,
      placeholder: "อาชีพ",
      disabled: false,
      label: "อาชีพ",
    },
    {
      name: "lat",
      value: selfInfo.lat,
      placeholder: "0.00",
      disabled: false,
      label: "ละติจูด",
    },
    {
      name: "lng",
      value: selfInfo.lng,
      placeholder: "0.00",
      disabled: false,
      label: "ลองจิจูด",
    },
  ];

  const prefixOptions = ["นาย", "นาง", "นางสาว"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelfInfo({ ...selfInfo, [name]: value });
  };

  const handlePrefixChange = (e) => {
    const { name, value } = e.target;
    setPrefixData({ ...prefixData, [name]: value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-center text-xl font-bold">
          ข้อมูลส่วนตัวของ{" "}
          <span className="text-gray-600">{`${userInfo?.prefix} ${userInfo?.first_name} ${userInfo?.last_name}`}</span>
        </h3>
        <div className="flex justify-center my-3">
          <Stepper />
        </div>
        <div className="mt-8 flex justify-center">
          <StudentPicture
            studentPic={image}
            handleChange={handlePictureChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {form.map((field, i) => (
            <div key={i} className="flex flex-col">
              {prefixFields.includes(i) ? (
                <div className="flex space-x-2">
                  <div className="flex flex-col w-1/4">
                    <label
                      htmlFor={`prefix${i}`}
                      className="mb-1 text-sm font-medium text-gray-700"
                    >
                      คำนำหน้า
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md bg-white 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name={`prefix${i}`}
                      id={`prefix${i}`}
                      value={
                        i === 0
                          ? prefixData.prefix0
                          : i === 4
                          ? prefixData.prefix4
                          : prefixData.prefix8
                      }
                      onChange={handlePrefixChange}
                    >
                      <option value="">คำนำหน้า</option>
                      {prefixOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <TextInput
                    name={field.name}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    value={field.value}
                    onChange={handleChange}
                    label={field.label}
                    i={i}
                    className={"w-3/4"}
                  />
                </div>
              ) : (
                <TextInput
                  name={field.name}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  value={field.value}
                  onChange={handleChange}
                  label={field.label}
                  i={i}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddSelfInfoForm;
