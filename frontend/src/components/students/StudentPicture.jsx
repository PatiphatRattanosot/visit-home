import { useRef } from "react";
import { FiPlus } from "react-icons/fi";

const StudentPicture = ({ studentPic, handleChange }) => {
  const inputRef = useRef(null);

  const handleOpenInput = () => {
    inputRef.current.click();
  };

  return (
    <div
      className="border-1 border-gray-200 bg-white w-[13.875rem] h-[18.5rem] rounded-md flex justify-center items-center hover:bg-gray-50 hover:cursor-pointer"
      onClick={handleOpenInput}
    >
      {/* ใช้ typeof เช็คว่าตัวแปรที่รับมาเป็นตัวแปรที่เป็นตัวอักษรรึป่าว */}
      {studentPic ? (
        <img
          src={
            typeof studentPic === "string"
              ? studentPic
              : URL.createObjectURL(studentPic)
          }
          alt="Student"
          className="h-full w-full bg-cover object-cover rounded-md p-1"
        />
      ) : (
        <FiPlus className="size-[6rem] text-[#1F2937]" />
      )}
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
        name="studentPic"
      />
    </div>
  );
};

export default StudentPicture;
