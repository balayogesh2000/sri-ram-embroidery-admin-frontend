import { useState } from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  errorMessage,
  ...props
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
        ${errorMessage ? "border-red-500" : "border-gray-300"}`}
        {...props}
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
