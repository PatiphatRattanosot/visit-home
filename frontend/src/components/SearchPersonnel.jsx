import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchPersonnel = ({
  personnel,
  setFilteredPersonnel,
  setCurrentPage,
}) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (value === "") {
      setFilteredPersonnel(personnel);
      return;
    }
    const result = personnel.filter((person) => {
      return (
        person.first_name.toLowerCase().includes(value.toLowerCase()) ||
        person.last_name.toLowerCase().includes(value.toLowerCase()) ||
        person.user_id.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredPersonnel(result);
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <input
        type="text"
        placeholder="ค้นหาบุคลากร..."
        value={keyword}
        onChange={handleChange}
        className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
      />
      <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
};

export default SearchPersonnel;
