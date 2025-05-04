import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import Userservices from "../../services/user.service";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
const AddPersonnel = () => {
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonnel({ ...personnel, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Userservices.addUser(personnel);
      toast.success("เพิ่มข้อมูลบุคลากรเรียบร้อยแล้ว!");
      document.getElementById("add_personnel").close();
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
      toast.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล!");
    }
  };
  return (
    <div>
      <dialog id="add_personnel" className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">เพิ่มข้อมูลบุคลากร</h3>
          <div className="flex flex-col items-center justify-center space-y-2">
          <SelectInput
              name={"prefix"}
              value={personnel.prefix}
              onChange={handleChange}
              label={"คำนำหน้า"}
              disabled={false}
              defaultOpt={"คำนำหน้า"}
              options={prefixOptions}
              className="w-64 md:w-72"
            />
            <TextInput
              name={"first_name"}
              placeholder={"ชื่อ"}
              disabled={false}
              value={personnel.first_name}
              onChange={handleChange}
              label={"ชื่อ"}
            />
            <TextInput
              name={"last_name"}
              placeholder={"นามสกุล"}
              disabled={false}
              value={personnel.last_name}
              onChange={handleChange}
              label={"นามสกุล"}
            />
            <TextInput
              name={"user_id"}
              placeholder={"เลขที่ประจำตัวบุคลากร"}
              disabled={false}
              value={personnel.user_id}
              onChange={handleChange}
              label={"เลขที่ประจำตัวบุคลากร"}
            />
            <SelectInput
              name={"rank"}
              value={personnel.rank}
              onChange={handleChange}
              label={"ตำแหน่ง"}
              disabled={false}
              defaultOpt={"ตำแหน่ง"}
              options={rankOptions}
              className="w-64 md:w-72"
              
            />
            <TextInput
              name={"phone"}
              placeholder={"เบอร์โทรศัพท์"}
              disabled={false}
              value={personnel.phone}
              onChange={handleChange}
              label={"เบอร์โทรศัพท์"}
            />
          </div>
          <SelectInput
              name={"status"}
              value={personnel.status}
              onChange={handleChange}
              label={"สถานะ"}
              disabled={false}
              
              options={statusOptions}
              className="w-64 md:w-72"
              
            />
          <div className="modal-action">
            <form method="dialog mt-2">
              <button onClick={handleSubmit} className="btn bg-green-400 mr-8">บันทึก</button>
              <button className="btn bg-red-400 mr-8">ยกเลิก</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddPersonnel;
