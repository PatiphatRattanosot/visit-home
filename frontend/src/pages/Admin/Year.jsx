import React, { useState, useEffect } from "react";
import YearServices from "../../services/years/years.service";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import ModalAddYear from "../../components/modals/AddYear"; 

const YearManagement = () => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const res = await YearServices.getYears();
      if (res.status === 200) {
        setYears(res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "เกิดข้อผิดพลาดในการโหลดปีการศึกษา"
      );
    }
  };

  const handleSelectYear = (year) => {
    toast.success(`คุณเลือกปีการศึกษา ${year}`);
    // หรือจะทำอย่างอื่น เช่น setYear(year) แล้ว redirect ไปหน้าอื่น
  };

  return (
    <>
      <div className="section-container w-full">
        <h1 className="text-center text-2xl font-bold mt-4 mb-6">จัดการปีการศึกษา</h1>

        <div className="flex flex-col items-center gap-6">
          {years.length === 0 ? (
            <div className="text-center">
              <h3 className="text-lg mb-4">ยังไม่มีการเพิ่มปีการศึกษา</h3>
              <button
                className="btn btn-outline size-40 rounded-xl"
                onClick={() => document.getElementById("add_year").showModal()}
              >
                <FaPlus className="size-28 text-gray-800" />
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {years.map((year, index) => (
                <button
                  key={index}
                  className="btn btn-outline w-40 h-40 rounded-xl text-4xl text-gray-800"
                  onClick={() => handleSelectYear(year.year)}
                >
                  {year.year}
                </button>
              ))}
            
            </div>
          )}
        </div>
      </div>

      <ModalAddYear addDataSuccess={fetchYears} />
    </>
  );
};

export default YearManagement;
