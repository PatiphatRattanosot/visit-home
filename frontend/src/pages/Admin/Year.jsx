import { useState, useEffect } from "react";
import YearServices from "../../services/years/years.service";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import ModalAddYear from "../../components/modals/AddYear";
import ModalEditYear from "../../components/modals/EditYear";

import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
const YearManagement = () => {
  const [years, setYears] = useState([]);
  console.log(years);

  // เรียกข้อมูลปีการศึกษา
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

  // เลือกปีแล้วมันจะเกิดแอ็คชั่น
  const handleSelectYear = (year) => {
    toast.success(`คุณเลือกปีการศึกษา ${year}`);
    // หรือจะทำอย่างอื่น เช่น setYear(year) แล้ว redirect ไปหน้าอื่น
  };

  // ฟังก์ชันสำหรับลบปีการศึกษา
  const handleDeleteYear = async (_id) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบข้อมูลปีการศึกษานี้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await YearServices.deleteYear(_id);
          if (response.status === 200) {
            Swal.fire({
              title: "ลบข้อมูลลบข้อมูลปีการศึกษานี้เรียบร้อย",
              text: response.data.message,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              fetchYears();
            });
          }
        } catch (err) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text:
              err.response?.data?.message || "ไม่สามารถลบข้อมูลปีการศึกษาได้",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
          console.log(err);
        }
      } else if (result.isDismissed) {
        Swal.fire({
          title: "ยกเลิกการลบข้อมูล",
          icon: "info",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <div className="section-container">
        <h1 className="text-center text-2xl font-bold mt-4 mb-6">
          จัดการปีการศึกษา
        </h1>

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
                <div key={index} className="relative">
                  <button
                    className="btn btn-outline w-40 h-40 rounded-xl text-4xl text-gray-800"
                    onClick={() => handleSelectYear(year.year)}
                  >
                    {year.year}
                  </button>

                  {/* จุดสามจุดที่มุมขวาบน */}
                  <div className="absolute top-2 right-2">
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-sm  z-10">
                        <p className="text-lg">⋯</p>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-2 z-[2] p-2 shadow bg-base-100 rounded-box w-36"
                      >
                        <li>
                          <button
                            onClick={() =>
                              document
                                .getElementById(`Edit_year_${year._id}`)
                                .showModal()
                            }
                          >
                            <FaPencilAlt className="text-yellow"/> แก้ไข
                          </button>
                        </li>

                        <li>
                          <button onClick={() => handleDeleteYear(year._id)}>
                            <MdDeleteForever className="text-red"/>ลบ
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Modal แก้ไขปีการศึกษา ย้ายออกมาอยู่ส่วนของ div ที่มี key*/}
                  <ModalEditYear onUpdateSuccess={fetchYears} year={year} />
                </div>
              ))}

              <button
                onClick={() => document.getElementById("add_year").showModal()}
                className="btn btn-outline w-40 h-40 rounded-xl text-4xl text-gray-800"
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>

      <ModalAddYear addDataSuccess={fetchYears} />
    </>
  );
};

export default YearManagement;
