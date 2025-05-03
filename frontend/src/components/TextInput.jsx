const TextInput = ({
  label,
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  disabled,
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} : <span className="text-red-600">*</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
        className="text-input"
      />
      {error && touched && (
        <div className="text-red-600 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default TextInput;
