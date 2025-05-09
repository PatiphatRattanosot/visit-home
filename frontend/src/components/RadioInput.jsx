import { useState, useEffect } from "react";

const RadioInput = ({
  name,
  id,
  value,
  onChange,
  onBlur,
  label,
  options = [],
  extraOpt = false,
  className = "",
  touched,
  error,
}) => {
  const [extraOptText, setExtraOptText] = useState("");

  // When the custom input is selected, update the radio group value
  useEffect(() => {
    if (value === extraOptText && onChange) {
      onChange({ target: { name, value: extraOptText } });
    }
  }, [extraOptText]);

  const handleExtraChange = (e) => {
    const text = e.target.value;
    setExtraOptText(text);
    // If already selected, update the main value
    if (value === text && onChange) {
      onChange({ target: { name, value: text } });
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
        {label} <span className="text-red-600">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2" id={id}>
        {options.map((item, index) => (
          <div className="flex items-center text-sm space-x-2" key={index}>
            <input
              type="radio"
              className="radio"
              name={name}
              value={item}
              checked={value === item}
              onChange={onChange}
              onBlur={onBlur}
            />
            <span>{item}</span>
          </div>
        ))}

        {extraOpt && (
          <div className="flex items-center text-sm space-x-1">
            <input
              type="radio"
              className="radio"
              name={name}
              value={extraOptText}
              checked={value === extraOptText}
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
              disabled={value !== extraOptText}
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
