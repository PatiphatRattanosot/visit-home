import React, { useEffect, useState } from "react";
import Userservice from "../../services/user.service";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import SearchPersonnel from "../../components/SearchPersonnel";
import FilterDropdown from "../../components/FilterDropdown";
import ModalAddPersonnel from "../../components/modals/AddPersonnel";
import ModalEditPersonnel from "../../components/modals/EditPersonnel";
const Personnel = () => {
  const [selectedOption, setSelectedOption] = useState("ทั้งหมด");
  const [personnel, setPersonnel] = useState([]); // สร้าง state สำหรับเก็บข้อมูลบุคลากร
  const [filteredPersonnel, setFilteredPersonnel] = useState([]);
  // สร้าง satate สำหรับ Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPersonnel.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // ฟังก์ชันสำหรับลบข้อมูลบุคลากร

  const handleDeleteUser = async (id) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบข้อมูลบุคลากรนี้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Userservice.deleteUser(id); // ลบหลังจากผู้ใช้ยืนยันแล้ว

          Swal.fire({
            title: "ลบข้อมูลบุคลากรเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            const updatedPersonnel = personnel.filter(
              (person) => person.id !== id
            );
            setPersonnel(updatedPersonnel);
            setFilteredPersonnel(updatedPersonnel);
          });
        } catch (error) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบข้อมูลบุคลากรได้",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
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

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await Userservice.getAllUsers();

        setPersonnel(response); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด
        setFilteredPersonnel(response); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด
      } catch (error) {
        console.error("Error fetching personnel data:", error);
      }
    };

    fetchPersonnel(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลบุคลากร
  }, []);
  console.log(personnel);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  
    if (option === "ลำดับตัวอักษร ก-ฮ") {
      const sorted = [...personnel].sort((a, b) =>
        a.first_name.localeCompare(b.first_name, "th")
      );
      setFilteredPersonnel(sorted);
    } else if (option === "ลำดับตัวอักษร ฮ-ก") {
      const sorted = [...personnel].sort((a, b) =>
        b.first_name.localeCompare(a.first_name, "th")
      );
      setFilteredPersonnel(sorted);
    } else {
      setFilteredPersonnel(personnel);
    }
  };
  
  

  const showStatus = (status) => {
    switch (status) {
      case "รับราชการ":
        return (
          <div className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
            รับราชการ
          </div>
        );
      case "เกษียณ":
        return (
          <div className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
            เกษียณ
          </div>
        );
      default:
        return (
          <div className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
            ลาออก
          </div>
        );
    }
  };
  return (
    <div className="section-container w-full">
      <h1 className="text-center">รายชื่อบุคลากร</h1>

      <div className="flex justify-between mb-4 m-10">
        {/* Dropdown สำหรับการกรองข้อมูล */}
        <FilterDropdown
  selectedOption={selectedOption}
  onOptionSelect={handleOptionSelect}
/>


        {/* ช่องค้นหา */}
        <SearchPersonnel
          personnel={personnel}
          setFilteredPersonnel={setFilteredPersonnel}
          setCurrentPage={setCurrentPage}
        />

        {/* ปุ่มเพิ่มบุคลากร */}
        <div className="relative w-40">
          <button
            onClick={() => document.getElementById("add_personnel").showModal()}
            className="btn btn-green"
          >
            เพิ่มบุคลากร
          </button>
        </div>
        {/* Modal เพิ่มบุคลากร */}
        <ModalAddPersonnel />
      </div>
      {/* ตารางแสดงข้อมูลบุคลากร */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>เลขที่ประจำตัว</th>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>ตำแหน่ง</th>
              <th>เบอร์โทรศัพท์</th>
              <th>สถานะ</th>
              <th>แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((person, index) => (
              <tr key={index}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td>{person.user_id}</td>
                <td>{person.prefix}</td>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{person.rank}</td>
                <td>{person.phone}</td>
                <td>{showStatus(person.status)}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      document.getElementById("edit_personnel").showModal()
                    }
                    className="btn btn-warning"
                  >
                    <BiSolidEdit size={20} />
                  </button>
                  <ModalEditPersonnel
                    personnel={person}
                    setPersonnel={setPersonnel}
                  />
                  <button
                    onClick={() => handleDeleteUser(person.id)}
                    className="btn btn-error"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border bg-white disabled:opacity-50"
        >
          &laquo;
        </button>

        {Array.from(
          { length: Math.ceil(filteredPersonnel.length / itemsPerPage) },
          (_, i) => i + 1
        ).map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-1 rounded border ${
              number === currentPage ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(filteredPersonnel.length / itemsPerPage)
              )
            )
          }
          disabled={
            currentPage === Math.ceil(filteredPersonnel.length / itemsPerPage)
          }
          className="px-3 py-1 rounded border bg-white disabled:opacity-50"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Personnel;