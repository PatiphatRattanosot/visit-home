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
  );
};

export default FilterDropdown;
