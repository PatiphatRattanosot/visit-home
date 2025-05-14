import { useEffect, useState } from "react";
import Userservice from "../../services/users/users.service";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
const ManageAdminRoles = () => {
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await Userservice.getAllUsers();
        const activePersonnel = response.data.users.filter(
          (person) => person.status === "รับราชการ"
        );
        setPersonnel(activePersonnel); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด
        // setFilteredPersonnel(activePersonnel); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด

        console.log("RESPONSE =", response);
      } catch (error) {
        console.error("Error fetching personnel data:", error);
      }
    };

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
  return (
    <div className="section-container">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>เลขที่ประจำตัว</th>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>ตำแหน่ง</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {personnel.map((person, index) => (
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
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ManageAdminRoles;
