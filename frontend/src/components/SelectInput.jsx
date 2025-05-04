import React from "react";

const SelectInput = ({
  options,
  defaultOpt,
  name,
  value,
  label,
  onChange,
  disabled,
  className = "w-1/4",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} : <span className="text-red-600">*</span>
      </label>
      <select
        className="select"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">{defaultOpt}</option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;