

const FilterDropdown = ({ selectedOption, setSelectedOption }) => {
 
const handleChange = (e) => {
  setSelectedOption(e.target.value);
}
 
  return (
    <select name="selectedOption" id="selectedOption" className="select select-bordered w-40" onChange={handleChange} value={selectedOption}>
      <option value="เรียงจากน้อยไปมาก">เรียงจากน้อยไปมาก</option>
      <option value="เรียงจากมากไปน้อย">เรียงจากมากไปน้อย</option>
      <option value="เรียงตามลำดับตัวอักษร ก-ฮ">เรียงตามลำดับตัวอักษร ก-ฮ</option>
      <option value="เรียงตามลำดับตัวอักษร ฮ-ก">เรียงตามลำดับตัวอักษร ฮ-ก</option>
    </select>
  );
};

export default FilterDropdown;
