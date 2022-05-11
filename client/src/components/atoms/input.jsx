import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  Icon,
  type,
  name,
  placeholder,
  value,
  setValue,
  className,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <div
        className={`flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-md p-2 ${className}`}
      >
        {Icon && (
          <Icon size={22} className="text-gray-800 dark:text-gray-200" />
        )}
        <div className="flex items-center gap-2 rounded-md w-full">
          <input
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={setValue}
            className="rounded-md px-2 py-1 w-full text-lg bg-inherit outline-none dark:text-gray-50 grow"
          />
          {type === "password" && (
            <div className="cursor-pointer p-2 rounded-md">
              <span
                className="dark:text-gray-200"
                size="xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
