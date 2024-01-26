// InputWithUnderlineFocus.tsx
import React from "react";

interface InputWithUnderlineFocusProps {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithUnderlineFocus: React.FC<InputWithUnderlineFocusProps> = ({
  placeholder,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="border-b border-gray-300 focus:border-blue-500 w-full px-4 py-2 outline-none transition duration-300 ease-in-out"
    />
  );
};

export default InputWithUnderlineFocus;
