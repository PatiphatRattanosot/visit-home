import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/auth.store";
import StudentPicture from "../../components/students/StudentPicture";
import TextInput from "../../components/TextInput";

const SelfInfo = () => {
  const { userInfo } = useAuthStore();
  const [studentPic, setStudentPic] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    studentFirstName: "",
    studentLastName: "",
  });

  const handleAddPic = (e) => {
    const image = e.target.files[0];
    // เช็คว่ามีไฟล์รึป่าว ถ้ามีก็นำเข้า state ถ้าไม่ก็กำหนด state เป็น null
    if (image) {
      setStudentPic(image);
    } else {
      setStudentPic(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  return (
    <div className="h-screen py-9 bg-gray-100 flex justify-center">
      <div className="bg-white px-4 py-6 w-9/12 rounded-lg">
        {/* หัวข้อ */}
        <h3 className="text-center text-xl">
          ข้อมูลการเยี่ยมบ้านของ{" "}
          {userInfo?.prefix +
            " " +
            userInfo?.first_name +
            " " +
            userInfo?.last_name}
        </h3>
        {/* ฟอร์ม */}
        <div className="flex justify-center mt-8">
          {/* รูปนักเรียน */}
          <StudentPicture studentPic={studentPic} handleChange={handleAddPic} />
        </div>
        {/* ชื่อ นามสกุล นักเรียน */}
        <div className="flex space-x-12 mt-6">
          <TextInput
            label={"ชื่อนักเรียน"}
            placeholder={"กรอกชื่อนักเรียน"}
            name={"studentFirstName"}
            value={studentInfo.studentFirstName}
            type={"text"}
            onChange={handleChange}
            disabled={false}
          />
          <TextInput
            label={"นามสกุลนักเรียน"}
            placeholder={"กรอกนามสกุลนักเรียน"}
            name={"studentLastName"}
            value={studentInfo.studentLastName}
            type={"text"}
            onChange={handleChange}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SelfInfo;
