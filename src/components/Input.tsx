import React from "react";

type FormInputProps = {
  label: string;
  disabled?: boolean;
  value?: string
};

const Input: React.FC<FormInputProps> = ({
  label,
  disabled = false,
  value
}) => {
  return (
    <div className="">
      <label className="block text-ct-blue-600 mb-3">
        {label}
      </label>
      <input
        placeholder=" "
        className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9] cursor-not-allowed"
        disabled={disabled}
        value={value}
      />
    </div>
  );
};

export default Input;
