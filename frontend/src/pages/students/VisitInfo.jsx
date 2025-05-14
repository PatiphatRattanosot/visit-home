import YearBtn from "../../components/students/YearBtn";
import { useState, useEffect } from "react";
import axios from "axios";

const VisitInfo = () => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchYear = async () => {
      try {
        const res = await axios.get("http://localhost:5000/years");
        if (res.status === 200) {
          setYears(res.data);
        }
      } catch (error) {
        console.log("บัคครับ บัค บัคที่ปี", error);
      }
    };
    fetchYear();
  }, []);
  console.log(years);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="md:px-8 md:py-6 bg-white rounded-lg w-8/12 my-6">
        <h3 className="text-center text-xl font-bold mb-6 md:mb-10 mt-4">
          เลือกปีการศึกษา
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 place-items-center mb-4 md:px-4">
          {years.length > 0 &&
            years.map((year, index) => (
              <div key={index}>
                <YearBtn year={year.year} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VisitInfo;
