import DateInput from "../../components/DateInput";
import FilterDropdown from "../../components/FilterDropdown";
import SearchClass from "../../components/SearchClassroom";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import ModalAddClassroom from "../../components/modals/AddClassroom"
const Classroom = () => {
  return (
    <>
      <div className="section-container">
        <h1 className="text-lg md:text-xl text-center">
          เพิ่มชั้นเรียนของปีการศึกษา 2565
        </h1>
        {/* กล่องสำหรับกำหนดช่วงเวลานัดเยี่ยมบ้าน */}
        <div className="flex justify-center items-center">
          <div className="card w-xl md:w-2xl p-4 shadow-sm flexl flex-col items-center justify-center">
            <h2 className="text-lg">กำหนดช่วงเวลานัดเยี่ยมบ้าน</h2>
            <div className="flex gap-2">
              <DateInput />
            </div>
          </div>
        </div>

        {/* ฟีเจอร์เสริม */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-4 gap-2">
          <FilterDropdown />
          <SearchClass />
          {/* ปุ่มเพิ่มบุคลากร */}
          <button
            onClick={() => document.getElementById("add_classroom").showModal()}
            className="btn-green"
          >
            เพิ่มชั้นเรียน
          </button>
          <ModalAddClassroom />
        </div>
        {/* ข้อมูลชั้นเรียนรูปแบบตาราง */}

        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>ชั้นเรียน</th>
              <th>จำนวนสมาชิก</th>
              <th>แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {/* <tr key={index}> */}
            <tr>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td>ม.5/1</td>
              <td>39</td>

              <td className="flex gap-2 items-center justify-center">
                <button
                  onClick={() =>
                    document
                      .getElementById("add_classroom")
                      .showModal()
                  }
                  className="btn btn-warning"
                >
                  <BiSolidEdit size={20} />
                </button>

                <button
                  // onClick={() => handleDeleteUser(person.email)}
                  className="btn btn-error"
                >
                  <AiOutlineDelete size={20} />
                </button>
              </td>
            </tr>
            {/* {currentItems.map((classroom, index) => (
              <tr key={index}>
                <td>{classroom.class}</td>
                <td>{classroom.quantity}</td>
                <td></td>
                
              </tr>
            ))} */}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>ชั้นเรียน</th>
              <th>จำนวนสมาชิก</th>
              <th>แก้ไข/ลบ</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Classroom;
