const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  disabled,
}) => {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-input"
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
