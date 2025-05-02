import { SlArrowDown } from "react-icons/sl";

export const getNavLinks = (role) => {
  switch (role) {
    case "Admin":
      return (
        <ul className="menu menu-vertical md:menu-horizontal px-1">
          <li>
            <a>หน้าแรก</a>
          </li>
          <li>
            <a>จัดการบุคลากร</a>
          </li>
        </ul>
      );

    case "Teacher":
      return (
        <ul className="menu menu-vertical md:menu-horizontal px-1">
          <li>
            <a>หน้าแรก</a>
          </li>
          <li>
            <a>รายชื่อนักเรียน</a>
          </li>
          <li>
            <a>ผลประเมิน SDQ</a>
          </li>
        </ul>
      );

    case "Student":
      return (
        <ul className="menu menu-vertical md:menu-horizontal px-1">
          <li>
            <a href="/student/status">หน้าแรก</a>
          </li>
          <li>
            <a href="/student/visit-info">ข้อมูลการเยี่ยมบ้าน</a>
          </li>
          <li>
            <details>
              <summary>ประเมิน SDQ</summary>
              <ul className="p-2">
                <li>
                  <a href="/student">นักเรียน</a>
                </li>
                <li>
                  <a href="/student">ผู้ปกครอง</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      );

    default:
      return null;
  }
};
