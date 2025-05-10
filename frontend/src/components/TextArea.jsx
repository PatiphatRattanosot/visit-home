const TextArea = ({
  label,
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  placeholder,
  disabled,
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} : <span className="text-red-600">*</span>
      </label>
      <textarea
        className="textarea-input"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      ></textarea>
      {error && touched && (
        <div className="text-red-600 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default TextArea;
