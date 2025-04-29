const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  i,
  className = "",
}) => {
  return (
    <div key={i} className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="text-input w-full"
      />
    </div>
  );
};

export default TextInput;
