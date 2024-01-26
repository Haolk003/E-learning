// InputWithFloatingLabel.tsx
import React, { useState } from "react";

interface InputWithFloatingLabelProps {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithFloatingLabel: React.FC<InputWithFloatingLabelProps> = ({
  placeholder,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <label className="block relative border rounded-lg px-3 h-[40px] focus-within:border-blue-500">
      <span
        className={`absolute left-1 top-2 text-gray-500 text-sm transition-all ${
          isFocused || value ? "-top-5 text-blue-500 text-xs" : ""
        }`}
      >
        {placeholder}
      </span>
      <input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={(e) => {
          onChange(e);
          setValue(e.target.value);
        }}
        className="w-full h-full border-none  bg-transparent outline-none focus:ring-0"
      />
    </label>
  );
};

export default InputWithFloatingLabel;
