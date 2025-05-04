import React from "react";

const FilterDropdown = ({ onOptionSelect, selectedOption }) => {
  return (
    <details className="dropdown">
      <summary className="btn">จัดเรียง: {selectedOption}</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <a onClick={() => onOptionSelect("จากน้อยไปมาก")}>จากน้อยไปมาก</a>
        </li>
        <li>
          <a onClick={() => onOptionSelect("ลำดับตัวอักษร ก-ฮ")}>ลำดับ ก-ฮ</a>
        </li>
        <li>
          <a onClick={() => onOptionSelect("ลำดับตัวอักษร ฮ-ก")}>ลำดับ ฮ-ก</a>
        </li>
      </ul>
    </details>
  );
};

export default FilterDropdown;
