import { useState, useEffect } from "react";
import Stepper from "../../../components/Stepper";
import axios from "axios";
import { useParams } from "react-router";
import { useAuthStore } from "../../../stores/auth.store";

const FamilyStatus = () => {
  const { userInfo } = useAuthStore();

  const { year } = useParams();
  const [familyStatusInfo, setFamilyStatusInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/studentInfo/1");
        if (res.status === 200) {
          setFamilyStatusInfo(res?.data?.family_status_info[0]);
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
          <Stepper step={3} path={stepperPath} />
        </div>
        {/* Manage info btn */}
        <div className="flex justify-end my-6">
          <a
            className={familyStatusInfo === null ? "btn-green" : "btn-yellow"}
            href={
              familyStatusInfo === null
                ? `/student/visit-info/${year}/family-status/add`
                : `/student/visit-info/${year}/family-status/update`
            }
          >
            {familyStatusInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>

        {/* ข้อมูลนักเรียน */}
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              <h3 className="text-xl font-bold text-gray-600 text-center mb-3">
                สถานะของครัวเรือน
              </h3>
              {familyStatusInfo !== null ? (
                <div className="text-left flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 text-gray-600">
                    <div>
                      ภาระพึ่งพิงของครัวเรือน:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.household_burdens.join(", ")}
                      </span>
                    </div>
                    <div>
                      ประเภทที่อยู่อาศัย:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.housing_type}
                      </span>
                    </div>
                    <div>
                      สภาพที่อยู่อาศัย:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.housing_condition}
                      </span>
                    </div>
                    <div>
                      ยานพาหนะของครอบครัว:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.family_vehicles.join(", ")}
                      </span>
                    </div>
                    <div>
                      จำนวนที่ดินที่มี:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.owned_land !== 0 ? (
                          <>
                            {familyStatusInfo.owned_land}{" "}
                            <span className="text-gray-600">ไร่</span>
                          </>
                        ) : (
                          " ไม่มี"
                        )}
                      </span>
                    </div>
                    <div>
                      เช่าที่ดินจำนวน:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.rented_land !== 0 ? (
                          <>
                            {familyStatusInfo.rented_land}{" "}
                            <span className="text-gray-600">ไร่</span>
                          </>
                        ) : (
                          " ไม่มี"
                        )}
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
    </div>
  );
};

export default FamilyStatus;
