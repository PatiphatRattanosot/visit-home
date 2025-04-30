import React, { useEffect, useState } from "react";
import {deleteUser } from "../../services/user.service";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import SearchPersonnel from "../../components/SearchPersonnel";
const Personnel = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("ทั้งหมด"); // << เพิ่มตรงนี้
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option); // ตั้งค่าที่เลือก
    setIsDropdownOpen(false); // ปิด dropdown หลังเลือกเสร็จ
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบข้อมูลนี้หรือไม่ (ไม่สามารถกู้คืนได้)",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id); // ไม่ต้องเช็ค status ถ้าไม่มี return status
        setPersonnel((prev) => prev.filter((user) => user.id !== id));
        Swal.fire({
          title: "ลบข้อมูลสำเร็จ",
          text: "ข้อมูลของคุณถูกลบเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        });

         } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถลบข้อมูลได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch("http://localhost:3000/user");
        const data = await response.json();
        setPersonnel(data); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด
        setFilteredPersonnel(data); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด
      } catch (error) {
        console.error("Error fetching personnel data:", error);
      }
    };

    fetchPersonnel(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลบุคลากร
  }, []);
  console.log(personnel);

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
    <div>
      <h1>รายชื่อบุคลากร</h1>

      <div className="flex justify-between mb-4 m-10">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="group relative border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
          >
            {selectedOption}
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full w-40 rounded-lg p-3 mt-1 bg-white shadow-md z-10">
              <a
                className="block px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("ทั้งหมด")}
              >
                ทั้งหมด
              </a>
              <a
                className="block px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("ลำดับตัวอักษร ก-ฮ")}
              >
                ลำดับตัวอักษร ก-ฮ
              </a>
              <a
                className="block px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("ลำดับตัวอักษร ฮ-ก")}
              >
                ลำดับตัวอักษร ฮ-ก
              </a>
            </div>
          )}
        </div>
        {/* ช่องค้นหา */}
        <SearchPersonnel
          personnel={personnel}
          setFilteredPersonnel={setFilteredPersonnel}
          setCurrentPage={setCurrentPage}
        />

        {/* ปุ่มเพิ่มบุคลากร */}
        <div className="relative w-40">
          <button className="btn btn-green">เพิ่มบุคลากร</button>
        </div>
      </div>

      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="border border-gray-300 px-4 py-2">
              เลขที่ประจำตัวบุคลากร
            </th>

            <th className="border border-gray-300 px-4 py-2">คำนำหน้าชื่อ</th>
            <th className="border border-gray-300 px-4 py-2">ชื่อ</th>
            <th className="border border-gray-300 px-4 py-2">นามสกุล</th>
            <th className="border border-gray-300 px-4 py-2">ตำแหน่ง</th>
            <th className="border border-gray-300 px-4 py-2">เบอร์โทรศัพท์</th>
            <th className="border border-gray-300 px-4 py-2">สถานะ</th>
            <th className="border border-gray-300 px-4 py-2">แก้ไข/ลบ</th>
          </tr>
        </thead>
        <tbody>
          {/* เพิ่มข้อมูลบุคลากรตรงนี้ */}
          {currentItems.map((person, index) => (
            <tr key={index} className="hover:bg-gray-100 cursor-pointer">
              <th>
                <label>
                  <input type="checkbox" className="form-checkbox" />
                </label>
              </th>
              <td className="text-center">{person.user_id}</td>
              <td className="text-center">{person.prefix}</td>
              <td className="text-center">{person.first_name}</td>
              <td className="text-center">{person.last_name}</td>
              <td className="text-center">{person.rank}</td>
              <td className="text-center">{person.phone}</td>
              <td className="text-center">{showStatus(person.status)}</td>
              <td className="flex gap-4 items-center justify-center">
                <button className="text-yellow-500 hover:text-yellow-700 text-4xl transition">
                  <BiSolidEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 text-4xl transition"
                  onClick={() => handleDelete(person.id)}
                >
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Pagination */}
       <div className="flex justify-center mt-4 gap-2">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 rounded border bg-white disabled:opacity-50"
  >
    &laquo;
  </button>

  {Array.from({ length: Math.ceil(filteredPersonnel.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
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
        Math.min(prev + 1, Math.ceil(filteredPersonnel.length / itemsPerPage))
      )
    }
    disabled={currentPage === Math.ceil(filteredPersonnel.length / itemsPerPage)}
    className="px-3 py-1 rounded border bg-white disabled:opacity-50"
  >
    &raquo;
  </button>
</div>

    </div>
  );
};

export default Personnel;
