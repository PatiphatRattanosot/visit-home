import React, { useState } from "react";

const DateInput = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSave = () => {
    // ทำสิ่งที่คุณต้องการเมื่อกดปุ่มบันทึก
    console.log("วันที่เริ่มต้นถูกบันทึก:", startDate);
    console.log("วันที่สิ้นสุดถูกบันทึก:", endDate);
  };

  return (
    <div className="flex flex-col gap-4">
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
    <div className="flex flex-col gap-2 w-full">
      <label className="label">
        <span className="label-text">วันที่เริ่มต้น</span>
      </label>
      <input
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        className="input input-bordered w-full md:w-42"
      />
    </div>
    <div className="flex flex-col gap-2 w-full">
      <label className="label">
        <span className="label-text">วันที่สิ้นสุด</span>
      </label>
      <input
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        className="input input-bordered w-full md:w-42"
      />
    </div>
  </div>
  <div className="flex justify-center">
    <button onClick={handleSave} className="btn-green">
      บันทึก
    </button>
  </div>
</div>
  );
};

export default DateInput;