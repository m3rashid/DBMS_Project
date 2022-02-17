import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Input = ({ Icon, type, name, placeholder, value, setValue }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <div className="flex items-center gap-2 bg-gray-200 rounded-md p-2">
        <FontAwesomeIcon icon={Icon} size="2x" />
        <div className="flex items-center gap-2 rounded-md">
          <input
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={setValue}
            className="rounded-md px-2 py-1 w-full text-lg bg-inherit outline-none"
          />
          {type === "password" && (
            <div className="cursor-pointer p-2 rounded-md hover:bg-gray-300">
              <FontAwesomeIcon
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
