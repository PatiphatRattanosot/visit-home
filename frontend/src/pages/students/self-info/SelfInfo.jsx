import { useAuthStore } from "../../../stores/auth.store";
import ShowPicture from "../../../components/students/ShowPicture";
import { useEffect, useState } from "react";
import axios from "axios";
import Stepper from "../../../components/Stepper";

const SelfInfo = () => {
  const { userInfo } = useAuthStore();
  // สร้าง state มาเก็นข้อมูล
  const [personalInfo, setPersonalInfo] = useState(null);

  // ดึงข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/studentInfo");
        if (res.status === 200) {
          setPersonalInfo(res.data.personal_info);
        }
      } catch (error) {
        console.log("ชิบหายแล้วน้อง", error, "บัคว่ะ");
      }
    };
    fetchData();
  }, []);

  console.log("Self-Info", personalInfo);

  // Tab spacing
  const tabSpacing = "\u00A0\u00A0\u00A0\u00A0";

  return (
    <div className="h-screen py-9 bg-gray-100 flex justify-center">
      <div className="bg-white px-4 py-6 w-9/12 rounded-lg">
        {/* หัวข้อ */}
        <h3 className="text-center text-xl font-bold">
          ข้อมูลการเยี่ยมบ้านของ{" "}
          <span className="text-gray-600">
            {userInfo?.prefix +
              " " +
              userInfo?.first_name +
              " " +
              userInfo?.last_name}
          </span>
        </h3>
        {/* Stepper */}
        <div className="my-3">
          <Stepper />
        </div>
        {/* แสดงรูป */}
        <div className="flex justify-center mt-8">
          <ShowPicture studentPic={personalInfo?.image} />
        </div>
        {/* ข้อมูลนักเรียน */}
        <div className="flex justify-center mt-6">
          <div className="bg-gray-50 max-w-2xl w-full rounded-lg px-6 py-10 flex justify-center">
            <div className="text-left flex flex-col gap-2.5">
              {/* ชื่อนักเรียน */}
              <h5 className="text-gray-600">
                ชื่อนักเรียน :{" "}
                <span className="text-black">
                  {userInfo?.prefix + " " + userInfo?.first_name}
                </span>
                {tabSpacing}
                นามสกุล :{" "}
                <span className="text-black">{userInfo?.last_name}</span>
              </h5>
              {/* ชื่อบิดา */}
              <h5 className="text-gray-600">
                ชื่อบิดา :{" "}
                <span className="text-black">
                  {personalInfo?.father_prefix +
                    " " +
                    personalInfo?.father_first_name}
                </span>
                {tabSpacing}
                นามสกุล :{" "}
                <span className="text-black">
                  {personalInfo?.father_last_name}
                </span>
              </h5>
              {/* อาชีพบิดา */}
              <h5 className="text-gray-600">
                อาชีพบิดา :{" "}
                <span className="text-black">{personalInfo?.father_job}</span>
                {tabSpacing}
                เบอร์โทรศัพท์ :{" "}
                <span className="text-black">{personalInfo?.father_phone}</span>
              </h5>
              {/* ชื่อมารดา */}
              <h5 className="text-gray-600">
                ชื่อมารดา :{" "}
                <span className="text-black">
                  {personalInfo?.mother_prefix +
                    " " +
                    personalInfo?.mother_first_name}
                </span>
                {tabSpacing}
                นามสกุล :{" "}
                <span className="text-black">
                  {personalInfo?.mother_last_name}
                </span>
              </h5>
              {/* อาชีพมารดา */}
              <h5 className="text-gray-600">
                อาชีพมารดา :{" "}
                <span className="text-black">{personalInfo?.mother_job}</span>
                {tabSpacing}
                เบอร์โทรศัพท์ :{" "}
                <span className="text-black">{personalInfo?.mother_phone}</span>
              </h5>
              {/* ชื่อผู้ปกครอง */}
              <h5 className="text-gray-600">
                ชื่อผู้ปกครอง :{" "}
                <span className="text-black">
                  {personalInfo?.parent_prefix +
                    " " +
                    personalInfo?.parent_first_name}
                </span>
                {tabSpacing}
                นามสกุล :{" "}
                <span className="text-black">
                  {personalInfo?.parent_last_name}
                </span>
              </h5>
              {/* อาชีพผู้ปกครอง */}
              <h5 className="text-gray-600">
                อาชีพผู้ปกครอง :{" "}
                <span className="text-black">{personalInfo?.parent_job}</span>
                {tabSpacing}
                เบอร์โทรศัพท์ :{" "}
                <span className="text-black">{personalInfo?.parent_phone}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfInfo;
