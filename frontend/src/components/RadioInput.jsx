import { useState, useEffect } from "react";

const RadioInput = ({
  name,
  value,
  onChange,
  onBlur,
  label,
  options = [],
  extraOpt = false,
  className = "",
  grid = "grid-cols-3",
  touched,
  error,
}) => {
  const [extraOptText, setExtraOptText] = useState("");

  // When value is not in options, it's the custom one
  useEffect(() => {
    if (!options.includes(value)) {
      setExtraOptText(value);
    }
  }, [value, options]);

  const handleExtraChange = (e) => {
    const text = e.target.value;
    setExtraOptText(text);
    onChange({ target: { name, value: text } });
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} : <span className="text-red-600">*</span>
      </label>
      <div className={`grid grid-cols-1 md:${grid} gap-3 mt-2`} id={name}>
        {options.map((item, index) => (
          <div className="flex items-center text-sm space-x-2" key={index}>
            <input
              type="radio"
              className="radio"
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

        {extraOpt && (
          <div className="flex items-center text-sm space-x-1">
            <input
              type="radio"
              className="radio"
              id={`${name}_custom`}
              name={name}
              value={extraOptText}
              checked={!options.includes(value)}
              onChange={() =>
                onChange({ target: { name, value: extraOptText } })
              }
              onBlur={onBlur}
            />
            <input
              type="text"
              placeholder="อื่นๆ"
              className="text-input"
              onChange={handleExtraChange}
              value={extraOptText}
              disabled={options.includes(value)} // disable when not selected
            />
          </div>
        )}
      </div>
      {error && touched && (
        <div className="text-red-600 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default RadioInput;
