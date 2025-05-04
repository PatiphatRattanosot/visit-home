const TextInputInModal = ({
    label,
    name,
    value,
    onChange,
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
          className="input w-64 md:w-72"
        />
      </div>
    );
  };
  
  export default TextInputInModal;