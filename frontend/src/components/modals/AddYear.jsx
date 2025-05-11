import React, { useState } from "react";
import YearServices from "../../services/years/years.service";
import toast from "react-hot-toast";

const AddYear = ({ addDataSuccess }) => {
  const [newYear, setNewYear] = useState("");

  const handleCreateYear = async () => {
    try {
      const res = await YearServices.createYear({ year: Number(newYear) });
      if (res.status === 201) {
        toast.success(res.data.message);
        addDataSuccess(); // แจ้งให้ component แม่ refresh รายการ ไม่งั้นก็ไม่เคย refresh ให้ผมเลยแมร่งเอ้ย
        setNewYear("");
        document.getElementById("add_year").close(); // ปิด modal
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มปี");
    }
  };

  return (
    <div>
      <dialog id="add_year" className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">เพิ่มปีการศึกษา</h3>

          <input
            type="number"
            className="text-center rounded-md mt-4 w-64 md:w-72 border h-12"
            placeholder="เช่น 2566"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
          />

          <div className="modal-action">
            <form method="dialog" className="flex gap-4 mt-4">
              <button className="btn bg-red-400 text-white">ยกเลิก</button>
              <button
                type="button"
                className="btn bg-green-500 text-white"
                onClick={handleCreateYear}
              >
                บันทึก
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddYear;
