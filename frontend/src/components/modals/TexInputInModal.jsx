const TextInputInModal = ({
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
  maxLength,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} : <span className="text-red-600">*</span>
      </label>
      <input
        maxLength={maxLength}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
        className="input w-64 md:w-72"
      />
      {error && touched && (
        <div className="text-red-600 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default TextInputInModal;