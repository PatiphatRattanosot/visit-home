const SelectInput = ({
  options,
  defaultOpt,
  name,
  value,
  label,
  onChange,
  disabled,
  className = "w-1/4",
  error,
  touched,
  onBlur,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} : <span className="text-red-600">*</span>
      </label>
      <select
        className="select-input"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      >
        {defaultOpt && <option value="">{defaultOpt}</option>}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && touched && (
        <div className="text-red-600 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default SelectInput;
