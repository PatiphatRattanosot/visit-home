import { useState, useEffect } from "react";
import Stepper from "../../../components/Stepper";
import axios from "axios";
import { useParams } from "react-router";
import { useAuthStore } from "../../../stores/auth.store";

const Behavior = () => {
  const { userInfo } = useAuthStore();

  const { year } = useParams();

  const [behaviorInfo, setBehaviorInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/studentInfo/1");
        if (res.status === 200) {
          setBehaviorInfo(res?.data?.behavior_and_risk[0]);
        }
      } catch (error) {
        console.log("บัคดึงข้อมูล", error);
      }
    };
    fetchData();
  }, []);

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
          <Stepper step={4} path={stepperPath} />
        </div>
        {/* Manage info btn */}
        <div className="flex justify-end my-6">
          <a
            className={behaviorInfo === null ? "btn-green" : "btn-yellow"}
            href={
              behaviorInfo === null
                ? `/student/visit-info/${year}/behavior/add`
                : `/student/visit-info/${year}/behavior/update`
            }
          >
            {behaviorInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>

        {/* ข้อมูลนักเรียน */}
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              <h3 className="text-xl font-bold text-gray-600 text-center mb-3">
                พฤติกรรมและความเสี่ยง
              </h3>
              {behaviorInfo !== null ? (
                <div className="text-left flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
                    {/* สุขภาพ */}
                    <div>
                      ด้านสุขภาพ:{" "}
                      <span className="text-black">
                        {behaviorInfo?.health_risk.length === 0
                          ? "ไม่มีความเสี่ยง"
                          : behaviorInfo.health_risk.join(", ")}
                      </span>
                    </div>
                    {/* สวัสดิการหรือความปลอดภัย */}
                    <div>
                      สวัสดิการหรือความปลอดภัย:{" "}
                      <span className="text-black">
                        {behaviorInfo?.welfare_and_safety.length === 0
                          ? "ไม่มีความเสี่ยง"
                          : behaviorInfo.welfare_and_safety.join(", ")}
                      </span>
                    </div>
                    {/* ระยะทางระหว่างบ้านไปโรงเรียน */}
                    <div>
                      ระยะทางระหว่างบ้านไปโรงเรียน:{" "}
                      <span className="text-black">
                        {behaviorInfo?.distance_to_school}
                      </span>{" "}
                      กิโลเมตร
                    </div>
                    {/* ใช้เวลาเดินทางประมาณ */}
                    <div>
                      ใช้เวลาเดินทางประมาณ:{" "}
                      <span className="text-black">
                        {behaviorInfo?.time_used}
                      </span>{" "}
                      ชั่วโมง
                    </div>
                    {/* การเดินทางของนักเรียนไปโรงเรียน */}
                    <div>
                      การเดินทางของนักเรียนไปโรงเรียน:{" "}
                      <span className="text-black">
                        {behaviorInfo?.school_transport}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      {/* ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว */}
                      <div>
                        ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว:{" "}
                        <span className="text-black">
                          {behaviorInfo?.student_responsibilities.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo.student_responsibilities.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* กิจกรรมยามว่างหรืองานอดิเรก */}
                      <div>
                        กิจกรรมยามว่างหรืองานอดิเรก:{" "}
                        <span className="text-black">
                          {behaviorInfo?.hobbies.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo.hobbies.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* พฤติกรรมการใช้สารเสพติด */}
                      <div>
                        พฤติกรรมการใช้สารเสพติด:{" "}
                        <span className="text-black">
                          {behaviorInfo?.drugs_behavior.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo.drugs_behavior.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* พฤติกรรมการใช้ความรุนแรง */}
                      <div>
                        พฤติกรรมการใช้ความรุนแรง:{" "}
                        <span className="text-black">
                          {behaviorInfo?.violent_behavior.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo.violent_behavior.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* พฤติกรรมทางเพศ */}
                      <div>
                        พฤติกรรมทางเพศ:{" "}
                        <span className="text-black">
                          {behaviorInfo?.sexual_behavior.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo.sexual_behavior.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* การติดเกม */}
                      <div>
                        การติดเกม:{" "}
                        <span className="text-black">
                          {behaviorInfo?.gaming_behavior.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo.gaming_behavior.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน */}
                      <div>
                        การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน:{" "}
                        <span className="text-black">
                          {behaviorInfo?.computer_internet_access}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์ */}
                      <div>
                        การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์:{" "}
                        <span className="text-black">
                          {behaviorInfo?.tech_use_behavior}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* ผู้ให้ข้อมูลนักเรียน */}
                      <div className="font-bold">
                        ผู้ให้ข้อมูลนักเรียน:{" "}
                        <span className="text-black">
                          {behaviorInfo?.information_giver}
                        </span>
                      </div>
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
    </div>
  );
};

export default Behavior;
