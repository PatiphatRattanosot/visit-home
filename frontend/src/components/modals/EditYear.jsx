import { useEffect, useState } from "react";
import YearServices from "../../services/years/years.service";
import TextInputInModal from "./TexInputInModal";
import toast from "react-hot-toast";
const EditYear = ({ year, onUpdateSuccess }) => {
  const [newYear, setNewYear] = useState(null);
 

  // ฟังก์ชันเรียกปีการศึกษาผ่าน id
  // useEffect(() => {
  //   const getYearById = async () => {
  //     try {
  //       const response = await YearServices.getYearById(year_id);
  //       if (response.status === 200) {
  //         setNewYear({ year: response.data.year });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       toast.error(
  //         err.response?.data?.message || "เกิดข้อผิดพลาดในการโหลดปีการศึกษา"
  //       );
  //     }
  //   };
  //   getYearById();
  // }, [year_id]);

  useEffect(() => {
    setNewYear(year);
  }, [year]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewYear((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ฟังก์ชันสำหรับแก้ไขปีการศึกษา
  const handleUpdateYear = async (e) => {
    e.preventDefault();
    try {
      //ก้อน object ที่จะส่งไป
      const response = await YearServices.updateYear(year._id, {
        year: newYear.year,
      });
      if (response.status === 200) {
        toast.success("แก้ไขปีการศึกษาเรียบร้อยแล้ว");
        onUpdateSuccess(); // แจ้งให้ component แม่ refresh รายการ
        document.getElementById(`Edit_year_${year._id}`).close();
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไขปีการศึกษา"
      );
    }
  };

  return (
    <div>
      <dialog id={`Edit_year_${year._id}`} className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">แก้ไขปีการศึกษา</h3>

          <TextInputInModal
            name={"year"}
            placeholder={"เช่น 2566"}
            disabled={false}
            value={newYear.year}
            onChange={handleChange}
            label={"ปีการศึกษา"}
            type="number"
          />

          <div className="modal-action">
            <form method="dialog" className="flex gap-4 mt-4">
              <button
                className="btn bg-red-400 text-white"
                onClick={() =>
                  document.getElementById(`Edit_year_${year._id}`).close()
                }
              >
                ยกเลิก
              </button>
              <button
                type="button"
                className="btn bg-green-500 text-white"
                onClick={handleUpdateYear}
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

export default EditYear;
