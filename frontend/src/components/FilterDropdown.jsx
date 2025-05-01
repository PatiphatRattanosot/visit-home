<<<<<<< HEAD
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
          <a onClick={() => onOptionSelect("ลำดับตัวอักษร ก-ฮ")}>
            ลำดับ ก-ฮ
          </a>
        </li>
        <li>
          <a onClick={() => onOptionSelect("ลำดับตัวอักษร ฮ-ก")}>
            ลำดับ ฮ-ก
          </a>
        </li>
      </ul>
    </details>
=======
import React, { useState } from "react";

const FilterDropdown = ({ onOptionSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="group relative border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        {selectedOption}
      </button>

      {isOpen && (
        <div className="absolute top-full w-40 rounded-lg p-3 mt-1 bg-white shadow-md z-10">
          {["ทั้งหมด", "ลำดับตัวอักษร ก-ฮ", "ลำดับตัวอักษร ฮ-ก"].map((option) => (
            <a
              key={option}
              className="block px-2 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
>>>>>>> 300d35e (Test react-chartjs2 update service mockup filtered dropdown table)
  );
};

export default FilterDropdown;
