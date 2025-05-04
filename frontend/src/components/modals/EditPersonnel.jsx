import Userservices from "../../services/user.service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";

const EditPersonnel = ({ id }) => {
  const navigate = useNavigate();

  const [personnel, setPersonnel] = useState({
    prefix: "",
    first_name: "",
    last_name: "",
    user_id: "",
    rank: "",
    phone: "",
    status: "รับราชการ",
  }); // สร้าง state สำหรับเก็บข้อมูลบุคลากร
  const prefixOptions = ["นาย", "นาง", "นางสาว"];
  const rankOptions = ["เจ้าหน้าที่ฝ่ายทะเบียน", "ครูที่ปรึกษา"];
  const statusOptions = ["ลาออก", "เกษียณ", "รับราชการ"];

  useEffect(() => {
    const getPersonnelById = async () => {
      try {
      
        const response = await Userservices.getUserById(id);
        if (response.status === 200) {
          setPersonnel(response.data);
        console.log(response);
        }
        
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล!");
      }
    };
    getPersonnelById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonnel({ ...personnel, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Userservices.updateUser(id, personnel);
      toast.success("แก้ไขข้อมูลบุคลากรเรียบร้อยแล้ว!");
      document.getElementById(`edit_personnel_${id}`).close();
      setPersonnel({
        first_name: "",
        last_name: "",
        user_id: "",
        rank: "",
        prefix: "",
        status: "",
      });
      navigate("/admin/personnel");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล!");
    }
  };
  return (
    <div>
      <dialog id={`edit_personnel_${id}`} className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">เพิ่มข้อมูลบุคลากร</h3>
          <div className="flex flex-col items-center justify-center space-y-2">
            <SelectInputInModal
              name={"prefix"}
              value={personnel.prefix}
              onChange={handleChange}
              label={"คำนำหน้า"}
              disabled={false}
              defaultOpt={"คำนำหน้า"}
              options={prefixOptions}
              className="w-64 md:w-72"
            />
            <TextInputInModal
              name={"first_name"}
              placeholder={"ชื่อ"}
              disabled={false}
              value={personnel.first_name}
              onChange={handleChange}
              label={"ชื่อ"}
            />
            <TextInputInModal
              name={"last_name"}
              placeholder={"นามสกุล"}
              disabled={false}
              value={personnel.last_name}
              onChange={handleChange}
              label={"นามสกุล"}
            />
            <TextInputInModal
              name={"user_id"}
              placeholder={"เลขที่ประจำตัวบุคลากร"}
              disabled={false}
              value={personnel.user_id}
              onChange={handleChange}
              label={"เลขที่ประจำตัวบุคลากร"}
            />
            <SelectInputInModal
              name={"rank"}
              value={personnel.rank}
              onChange={handleChange}
              label={"ตำแหน่ง"}
              disabled={false}
              defaultOpt={"ตำแหน่ง"}
              options={rankOptions}
              className="w-64 md:w-72"
            />
            <TextInputInModal
              name={"phone"}
              placeholder={"เบอร์โทรศัพท์"}
              disabled={false}
              value={personnel.phone}
              onChange={handleChange}
              label={"เบอร์โทรศัพท์"}
            />
          </div>
          <SelectInputInModal
            name={"status"}
            value={personnel.status}
            onChange={handleChange}
            label={"สถานะ"}
            disabled={false}
            defaultOpt={"สถานะ"}
            options={statusOptions}
            className="w-64 md:w-72"
          />
          <div className="modal-action">
            <form method="dialog mt-2">
              <div className="flex gap-6">
                <button onClick={handleSubmit} className="btn-green">
                บันทึก
              </button>
              <button className="btn-red">ยกเลิก</button>
              </div>
              
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditPersonnel;
