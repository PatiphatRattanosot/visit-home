import { useAuthStore } from "../../../stores/auth.store";
import ShowPicture from "../../../components/students/ShowPicture";
import { useEffect, useState } from "react";
import axios from "axios";
import Stepper from "../../../components/Stepper";
import { useParams } from "react-router";

const SelfInfo = () => {
  const { userInfo } = useAuthStore();
  const { year } = useParams();
  // สร้าง state มาเก็นข้อมูล
  const [personalInfo, setPersonalInfo] = useState(null);

  // ดึงข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/studentInfo/1");
        if (res.status === 200) {
          setPersonalInfo(res.data.personal_info[0]);
        }
      } catch (error) {
        console.log("ชิบหายแล้วน้อง", error, "บัคว่ะ");
      }
    };
    fetchData();
  }, []);

  console.log("Self-Info", personalInfo);

  // stepper path
  const stepperPath = {
    stepOne: `/student/visit-info/${year}/self-info`,
    stepTwo: `/student/visit-info/${year}/relation`,
    stepThree: `/student/visit-info/${year}/family-status`,
    stepFour: `/student/visit-info/${year}/behavior`,
  };

  return (
    <div className="min-h-screen py-9 bg-gray-100 flex justify-center">
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
        <div className="my-3 flex justify-center">
          <Stepper step={1} path={stepperPath} />
        </div>
        {/* Manage info btn */}
        <div className="flex justify-end my-6">
          <a
            className={personalInfo === null ? "btn-green" : "btn-yellow"}
            href={
              personalInfo === null
                ? `/student/visit-info/${year}/self-info/add`
                : `/student/visit-info/${year}/self-info/update`
            }
          >
            {personalInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>
        {/* แสดงรูป */}
        <div className="flex justify-center mt-8">
          <ShowPicture studentPic={personalInfo?.image} />
        </div>
        {/* ข้อมูลนักเรียน */}
        <div className="flex justify-center mt-6">
          <div className="bg-gray-50 max-w-2xl w-full rounded-lg px-6 py-10 flex justify-center">
            {personalInfo !== null ? (
              <div className="text-left flex flex-col gap-2.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
                  {/* ชื่อนักเรียน */}
                  <div>
                    ชื่อนักเรียน:{" "}
                    <span className="text-black">
                      {userInfo?.prefix + " " + userInfo?.first_name}
                    </span>
                  </div>
                  <div>
                    นามสกุล:{" "}
                    <span className="text-black">{userInfo?.last_name}</span>
                  </div>

                  {/* ชื่อบิดา */}
                  <div>
                    ชื่อบิดา:{" "}
                    <span className="text-black">
                      {personalInfo?.father_prefix +
                        " " +
                        personalInfo?.father_first_name}
                    </span>
                  </div>
                  <div>
                    นามสกุลบิดา:{" "}
                    <span className="text-black">
                      {personalInfo?.father_last_name}
                    </span>
                  </div>

                  {/* อาชีพบิดา */}
                  <div>
                    อาชีพบิดา:{" "}
                    <span className="text-black">
                      {personalInfo?.father_job}
                    </span>
                  </div>
                  <div>
                    เบอร์โทรศัพท์บิดา:{" "}
                    <span className="text-black">
                      {personalInfo?.father_phone}
                    </span>
                  </div>

                  {/* ชื่อมารดา */}
                  <div>
                    ชื่อมารดา:{" "}
                    <span className="text-black">
                      {personalInfo?.mother_prefix +
                        " " +
                        personalInfo?.mother_first_name}
                    </span>
                  </div>
                  <div>
                    นามสกุลมารดา:{" "}
                    <span className="text-black">
                      {personalInfo?.mother_last_name}
                    </span>
                  </div>

                  {/* อาชีพมารดา */}
                  <div>
                    อาชีพมารดา:{" "}
                    <span className="text-black">
                      {personalInfo?.mother_job}
                    </span>
                  </div>
                  <div>
                    เบอร์โทรศัพท์มารดา:{" "}
                    <span className="text-black">
                      {personalInfo?.mother_phone}
                    </span>
                  </div>

                  {/* ชื่อผู้ปกครอง */}
                  <div>
                    ชื่อผู้ปกครอง:{" "}
                    <span className="text-black">
                      {personalInfo?.parent_prefix +
                        " " +
                        personalInfo?.parent_first_name}
                    </span>
                  </div>
                  <div>
                    นามสกุลผู้ปกครอง:{" "}
                    <span className="text-black">
                      {personalInfo?.parent_last_name}
                    </span>
                  </div>

                  {/* อาชีพผู้ปกครอง */}
                  <div>
                    อาชีพผู้ปกครอง:{" "}
                    <span className="text-black">
                      {personalInfo?.parent_job}
                    </span>
                  </div>
                  <div>
                    เบอร์โทรศัพท์ผู้ปกครอง:{" "}
                    <span className="text-black">
                      {personalInfo?.parent_phone}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center my-16 text-gray-500">
                ยังไม่มีข้อมูล
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfInfo;
