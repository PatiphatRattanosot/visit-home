import { useEffect, useState } from "react";
import Userservice from "../../services/users/users.service";
import FilterDropdown from "../../components/FilterDropdown";
import SearchPersonnel from "../../components/SearchPersonnel";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
const ManageAdminRoles = () => {
  const [personnel, setPersonnel] = useState([]);
  const [filteredPersonnel, setFilteredPersonnel] = useState([]);
  const [selectedOption, setSelectedOption] = useState("เรียงจากน้อยไปมาก");

  // สร้าง satate สำหรับ Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPersonnel.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const fetchPersonnel = async () => {
    try {
      const response = await Userservice.getAllUsers();
      const activePersonnel = response.data.users.filter(
        (person) => person.status === "รับราชการ"
      );
      setPersonnel(activePersonnel); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด
      // setFilteredPersonnel(activePersonnel); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด
      setFilteredPersonnel(activePersonnel); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด

      console.log("RESPONSE =", response);
    } catch (error) {
      console.error("Error fetching personnel data:", error);
    }
  };

  useEffect(() => {
    fetchPersonnel(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลบุคลากร
  }, []);

  const getRoleDisplay = (role) => {
    const roles = Array.isArray(role) ? role : [role]; // แปลงให้เป็น array เสมอ
    //ใช้ includes() เรียงลำดับความสำคัญของบทบาท และ คืนค่าชื่อบทบาทที่เหมาะสม
    if (roles.includes("Admin")) return "เจ้าหน้าที่ฝ่ายทะเบียน";
    if (roles.includes("Teacher")) return "คุณครู";
    if (roles.includes("Student")) return "นักเรียน";

    return "ไม่ทราบบทบาท";
  };

  const handleAddRole = async (email, newRole) => {
    try {
      const response = await Userservice.addAdminRole(email, newRole);
      console.log("RESPONSE =", response);
      const message = response.data.message || "บทบาทถูกเปลี่ยนเรียบร้อยแล้ว";

      if (response.status === 200) {
        toast.success(message);
        fetchPersonnel();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "เกิดข้อผิดพลาดในการเปลี่ยนบทบาท";
      console.error("Error changing role:", error);
      toast.error(errorMessage);
    }
  };

  const handleRemoveRole = async (email, roleToRemove) => {
    try {
      Swal.fire({
        title: "ยืนยันการลบบทบาท",
        text: `คุณต้องการลบบทบาทของ ${roleToRemove} หรือไม่?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await Userservice.removeAdminRole(
            email,
            roleToRemove
          );
          console.log("RESPONSE =", response);
          const message = response.data.message || "บทบาทถูกลบเรียบร้อยแล้ว";

          if (response.status === 200) {
            toast.success(message);
            fetchPersonnel();
          }
        } else if (result.isDismissed) {
          Swal.fire({
            title: "ยกเลิกการลบบทบาท",
            icon: "info",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "เกิดข้อผิดพลาดในการลบบทบาท";
      console.error("Error removing role:", error);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    let sorted = [...personnel];

    switch (selectedOption) {
      case "เรียงจากน้อยไปมาก":
        sorted.sort((a, b) => a.user_id - b.user_id);
        break;
      case "เรียงจากมากไปน้อย":
        sorted.sort((a, b) => b.user_id - a.user_id);
        break;
      case "เรียงตามลำดับตัวอักษร ก-ฮ":
        sorted.sort((a, b) => a.first_name.localeCompare(b.first_name, "th"));
        break;
      case "เรียงตามลำดับตัวอักษร ฮ-ก":
        sorted.sort((a, b) => b.first_name.localeCompare(a.first_name, "th"));
        break;
      default:
        break;
    }
    setFilteredPersonnel(sorted);
  }, [selectedOption, personnel]);
  return (
    <div className="section-container">
      <div className="overflow-x-auto">
        {/* หัวข้อ */}
        <p className="text-xl text-center">หน้าจัดการบทบาทผู้ดูแล</p>
        {/* ฟีเจอร์เสริม */}
        <div className="flex flex-col md:flex-row justify-between mb-4 mt-4 gap-2">
          {/* Dropdown สำหรับการกรองข้อมูล */}
          <FilterDropdown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          {/* ช่องค้นหา */}
          <div className="ml-auto">
            <SearchPersonnel
              personnel={personnel}
              setFilteredPersonnel={setFilteredPersonnel}
            />
          </div>
        </div>
        
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>เลขที่ประจำตัว</th>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>ตำแหน่ง</th>
              <th>บทบาทผู้ดูแล</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentItems.map((person, index) => (
              <tr key={index}>
                <td>{person.user_id}</td>
                <td>{person.prefix}</td>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{getRoleDisplay(person.role)}</td>
                <td>
                  <input
                    type="checkbox"
                    // ใช้ได้สองแบบเลย
                    // checked={user.role === "admin"}
                    checked={person.role.includes("Admin")}
                    onChange={(e) =>
                      e.target.checked
                        ? handleAddRole(person.email, "Admin")
                        : handleRemoveRole(person.email, "Admin")
                    }
                    className="toggle toggle-secondary"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>เลขที่ประจำตัว</th>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>ตำแหน่ง</th>
              <th>บทบาทผู้ดูแล</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Pagination */}
      <Pagination
        totalItems={filteredPersonnel.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageAdminRoles;
