import { useState } from "react";
import { useAuthStore } from "../../../stores/auth.store";
import Stepper from "../../../components/Stepper";

const Relation = () => {
  const { userInfo } = useAuthStore();
  const [relationInfo, setRelationInfo] = useState(null);

  // stepper path
  const stepperPath = {
    stepOne: `/student/self-info`,
    stepTwo: `/student/relation`,
    stepThree: `/student/family-status`,
    stepFour: `/student/behavior`,
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
          <Stepper step={2} path={stepperPath} />
        </div>
        {/* Manage info btn */}
        <div className="flex justify-end my-6">
          <a
            className={relationInfo === null ? "btn-green" : "btn-yellow"}
            href={
              relationInfo === null
                ? `/student/relation/add`
                : `/student/relation/update`
            }
          >
            {relationInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>

        {/* ข้อมูลนักเรียน */}
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-2xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              {relationInfo !== null ? (
                <div className="text-left flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
                    {/* Your actual data here */}
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

export default Relation;
