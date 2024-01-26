// InputWithBoldBorder.tsx
import React from "react";

interface InputWithBoldBorderProps {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithBoldBorder: React.FC<InputWithBoldBorderProps> = ({
  placeholder,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:shadow-outline"
    />
  );
};

export default InputWithBoldBorder;
