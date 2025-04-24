// Define the nav links based on the role
export const getNavLinks = (role) => {
  const baseLink = "block px-4 py-2 hover:bg-gray-100 text-sm";

  switch (role) {
    case "Admin":
      return (
        <>
          <li>
            <a href="/admin" className={baseLink}>
              หน้าหลัก
            </a>
          </li>
          <li>
            <a href="/admin/personnel" className={baseLink}>
              บุคลากร
            </a>
          </li>
        </>
      );

    case "Teacher":
      return (
        <>
          <li>
            <a href="/teacher" className={baseLink}>
              หน้าหลัก
            </a>
          </li>
          <li>
            <a href="/teacher" className={baseLink}>
              รายชื่อนักเรียน
            </a>
          </li>
          <li>
            <a href="/teacher" className={baseLink}>
              ผลประเมิน SDQ
            </a>
          </li>
        </>
      );

    case "Student":
      return (
        <>
          <li>
            <a href="/student" className={baseLink}>
              หน้าหลัก
            </a>
          </li>
          <li>
            <a href="/student" className={baseLink}>
              จัดการข้อมูลการเยี่ยมบ้าน
            </a>
          </li>
          <li tabIndex={0} className="relative">
            <details className="group">
              <summary
                className={`cursor-pointer flex items-center ${baseLink}`}
              >
                ประเมิน SDQ
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <ul className="absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-40 py-1 z-10">
                <li>
                  <a
                    href="/student"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    ผู้ปกครอง
                  </a>
                </li>
                <li>
                  <a
                    href="/student"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    นักเรียน
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </>
      );

    default:
      return null;
  }
};
