import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
const SearchClassroom = () => {
     const [keyword, setKeyword] = useState("");

//      const handleChange = (e) => {
//     const value = e.target.value;
//     setKeyword(value);
//     if (value === "") {
//       setFilteredClassroom(classroom);
//       return;
//     }
//     const result = personnel.filter((classroom) => {
//       return (
//         classroom.class.toLowerCase().includes(value.toLowerCase())
        
//       );
//     });
//     setFilteredPerssetFilteredClassroomonnel(result);
//     setCurrentPage(1);
//   };
  return (
    <div>
         <div className="w-full max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="ค้นหาชั้นเรียน..."
                value={keyword}
              
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
              <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
    </div>
  )
}

export default SearchClassroom