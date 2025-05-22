import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const CheckboxInput = ({
  name,
  value = [],
  extraOpt = false,
  onChange,
  onBlur,
  label,
  options = [],
  className = "",
  grid = "grid-cols-1",
  touched,
  error,
  setFieldValue,
}) => {
  const [extraOptText, setExtraOptText] = useState("");
  const [isExtraChecked, setIsExtraChecked] = useState(false);

  // Debounced function to update Formik field
  const debouncedUpdate = useCallback(
    debounce((text) => {
      const trimmed = text.trim();
      if (trimmed) {
        const newValue = [...value.filter((v) => v !== trimmed), trimmed];
        setFieldValue(name, newValue);
      }
    }, 300), // 300ms debounce delay
    [value, setFieldValue, name]
  );

  useEffect(() => {
    if (isExtraChecked) {
      debouncedUpdate(extraOptText);
    }

    return () => {
      debouncedUpdate.cancel();
    };
  }, [extraOptText, isExtraChecked, debouncedUpdate]);

  const handleExtraCheckbox = () => {
    setIsExtraChecked(!isExtraChecked);

    if (isExtraChecked && extraOptText.trim()) {
      setFieldValue(name, [...value, extraOptText.trim()]);
    } else {
      // Remove extraOptText from value array
      setFieldValue(
        name,
        value.filter((v) => v !== extraOptText)
      );
    }
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
              type="checkbox"
              className="checkbox"
              id={`${name}_${index}`}
              name={name}
              value={item}
              checked={value.includes(item)}
              onChange={onChange}
              onBlur={onBlur}
            />
            <label htmlFor={`${name}_${index}`}>{item}</label>
          </div>
        ))}

        {extraOpt && (
          <div className="flex items-center text-sm space-x-2">
            <input
              type="checkbox"
              className="checkbox"
              id={`${name}_custom`}
              name={`${name}_custom`}
              checked={isExtraChecked}
              onChange={handleExtraCheckbox}
              onBlur={onBlur}
            />
            <input
              type="text"
              placeholder="อื่นๆ"
              className="text-input"
              value={extraOptText}
              onChange={(e) => setExtraOptText(e.target.value)}
              disabled={!isExtraChecked}
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

export default CheckboxInput;
