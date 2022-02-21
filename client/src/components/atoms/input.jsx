import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Input = ({ Icon, type, name, placeholder, value, setValue }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-md p-2">
        <FontAwesomeIcon className="dark:text-gray-200" icon={Icon} size="2x" />
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
            <div className="cursor-pointer p-2 rounded-md hover:bg-gray-300">
              <FontAwesomeIcon
                className="dark:text-gray-200"
                size="xl"
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
