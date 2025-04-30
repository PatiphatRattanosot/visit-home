import { useState } from "react";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import StudentPicture from "../../../components/students/StudentPicture";
import Stepper from "../../../components/Stepper";
import { useAuthStore } from "../../../stores/auth.store";

const AddSelfInfoForm = () => {
  const { userInfo } = useAuthStore();
  const [selfInfo, setSelfInfo] = useState({
    father_prefix: "",
    father_first_name: "",
    father_last_name: "",
    father_phone: "",
    father_job: "",
    mother_prefix: "",
    mother_first_name: "",
    mother_last_name: "",
    mother_phone: "",
    mother_job: "",
    family_relation_status: "",
    parent_prefix: "",
    parent_first_name: "",
    parent_last_name: "",
    parent_phone: "",
    parent_job: "",
    lat: "",
    lng: "",
  });

  const [image, setImage] = useState(null);

  const prefixOptions = ["นาย", "นาง", "นางสาว"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelfInfo({ ...selfInfo, [name]: value });
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
          {/* ชื่อและคำนำหน้า */}
          <div className="flex space-x-2">
            {/* คำนำหน้า บิดา */}
            <SelectInput
              name={"father_prefix"}
              value={selfInfo.father_prefix}
              onChange={handleChange}
              label={"คำนำหน้า"}
              disabled={false}
              defaultOpt={"คำนำหน้า"}
              options={prefixOptions}
            />
            {/* ชื่อ บิดา */}
            <TextInput
              name={"father_first_name"}
              placeholder={"กรอกชื่อบิดา"}
              disabled={false}
              value={selfInfo.father_first_name}
              onChange={handleChange}
              label={"ชื่อบิดา"}
              className={"w-3/4"}
            />
          </div>
          {/* นามสกุลบิดา */}
          <TextInput
            name={"father_last_name"}
            placeholder={"กรอกนาสกุลบิดา"}
            disabled={false}
            value={selfInfo.father_last_name}
            onChange={handleChange}
            label={"นามสกุลบิดา"}
          />
          {/* อาชีพบิดา */}
          <TextInput
            name={"father_job"}
            placeholder={"กรอกอาชีพของบิดา"}
            disabled={false}
            value={selfInfo.father_job}
            onChange={handleChange}
            label={"อาชีพ"}
          />
          {/* เบอร์โทรศัพท์ */}
          <TextInput
            name={"father_phone"}
            placeholder={"กรอกเบอร์โทรศัพท์ของบิดา"}
            disabled={false}
            value={selfInfo.father_phone}
            onChange={handleChange}
            label={"เบอร์โทรศัพท์"}
          />
          {/* ชื่อและคำนำหน้า */}
          <div className="flex space-x-2">
            {/* คำนำหน้า มารดา */}
            <SelectInput
              name={"mother_prefix"}
              value={selfInfo.mother_prefix}
              onChange={handleChange}
              label={"คำนำหน้า"}
              disabled={false}
              defaultOpt={"คำนำหน้า"}
              options={prefixOptions}
            />
            {/* ชื่อ มารดา */}
            <TextInput
              name={"mother_first_name"}
              placeholder={"กรอกชื่อมารดา"}
              disabled={false}
              value={selfInfo.mother_first_name}
              onChange={handleChange}
              label={"ชื่อมารดา"}
              className={"w-3/4"}
            />
          </div>
          {/* นามสกุลมารดา */}
          <TextInput
            name={"mother_last_name"}
            placeholder={"กรอกนาสกุลมารดา"}
            disabled={false}
            value={selfInfo.mother_last_name}
            onChange={handleChange}
            label={"นามสกุลมารดา"}
          />
          {/* อาชีพมารดา */}
          <TextInput
            name={"mother_job"}
            placeholder={"กรอกอาชีพของมารดา"}
            disabled={false}
            value={selfInfo.mother_job}
            onChange={handleChange}
            label={"อาชีพ"}
          />
          {/* เบอร์โทรศัพท์ */}
          <TextInput
            name={"mother_phone"}
            placeholder={"กรอกเบอร์โทรศัพท์ของมารดา"}
            disabled={false}
            value={selfInfo.mother_phone}
            onChange={handleChange}
            label={"เบอร์โทรศัพท์"}
          />
          {/* ชื่อและคำนำหน้า */}
          <div className="flex space-x-2">
            {/* คำนำหน้า ผู้ปกครอง */}
            <SelectInput
              name={"parent_prefix"}
              value={selfInfo.parent_prefix}
              onChange={handleChange}
              label={"คำนำหน้า"}
              disabled={false}
              defaultOpt={"คำนำหน้า"}
              options={prefixOptions}
            />
            {/* ชื่อ ผู้ปกครอง */}
            <TextInput
              name={"parent_first_name"}
              placeholder={"กรอกชื่อผู้ปกครอง"}
              disabled={false}
              value={selfInfo.parent_first_name}
              onChange={handleChange}
              label={"ชื่อผู้ปกครอง"}
              className={"w-3/4"}
            />
          </div>
          {/* นามสกุลผู้ปกครอง */}
          <TextInput
            name={"parent_last_name"}
            placeholder={"กรอกนาสกุลผู้ปกครอง"}
            disabled={false}
            value={selfInfo.parent_last_name}
            onChange={handleChange}
            label={"นามสกุลผู้ปกครอง"}
          />
          {/* อาชีพผู้ปกครอง */}
          <TextInput
            name={"parent_job"}
            placeholder={"กรอกอาชีพของผู้ปกครอง"}
            disabled={false}
            value={selfInfo.parent_job}
            onChange={handleChange}
            label={"อาชีพ"}
          />
          {/* เบอร์โทรศัพท์ */}
          <TextInput
            name={"parent_phone"}
            placeholder={"กรอกเบอร์โทรศัพท์ของผู้ปกครอง"}
            disabled={false}
            value={selfInfo.parent_phone}
            onChange={handleChange}
            label={"เบอร์โทรศัพท์"}
          />
          {/* lat */}
          <TextInput
            name={"lat"}
            placeholder={"0.00"}
            disabled={false}
            value={selfInfo.lat}
            onChange={handleChange}
            label={"ละติจูด"}
          />
          {/* lng */}
          <TextInput
            name={"lng"}
            placeholder={"0.00"}
            disabled={false}
            value={selfInfo.lng}
            onChange={handleChange}
            label={"ลองจิจูด"}
          />
        </div>
        <div className="flex justify-between mt-10 space-x-2">
          <button className="btn-red w-1/2">ยกเลิก</button>
          <button className="btn w-1/2">ถัดไป</button>
        </div>
      </div>
    </div>
  );
};

export default AddSelfInfoForm;
