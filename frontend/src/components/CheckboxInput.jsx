const CheckboxInput = ({
  name,
  id,
  value,
  onChange,
  onBlur,
  label,
  options = [],
  className = "",
  grid = "grid-cols-3",
  touched,
  error,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
        {label} <span className="text-red-600">*</span>
      </label>
      <div className={`grid grid-cols-1 md:${grid} gap-3 mt-2`} id={id}>
        {options.map((item, index) => (
          <div className="flex items-center text-sm space-x-2" key={index}>
            <input
              type="checkbox"
              className="checkbox"
              id={`${name}_${index}`}
              name={name}
              value={item}
              checked={value === item}
              onChange={onChange}
              onBlur={onBlur}
            />
            <label htmlFor={`${name}_${index}`}>{item}</label>
          </div>
        ))}
      </div>
      {error && touched && (
        <div className="text-red-600 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default CheckboxInput;
