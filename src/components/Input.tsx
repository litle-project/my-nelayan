/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface IProps {
  type?: string;
  error?: string;
  placeholder?: string;
  handler: (param: string) => void;
  eventKey?: (param: string) => void;
  classes?: string;
  icon?: string | null;
  iconClass?: string | null;
  iconHandler: (param: string) => void;
  styles?: any;
}

const Input = (props: IProps) => {
  const {
    type = "text",
    handler,
    error = "",
    eventKey = () => {},
    classes = "",
    placeholder = "Input here",
    icon = null,
    iconClass = null,
    iconHandler = () => {},
    styles = null,
  } = props;

  const [model, setModel] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    setModel(inputValue);
    if (event.key === "Enter") {
      eventKey(inputValue);
    }
  };

  return (
    <div className="flex flex-col relative">
      <input
        type={type}
        className={`
          ${classes} w-full px-4 h-14 bg-gray-50 border 
          placeholder-gray-700 text-sm text-gray-800
          focus:outline-1 ${error !== "" ? "border-red-500" : "border-gray-300"}
        `}
        placeholder={placeholder}
        onKeyUp={handleKeyDown}
        onChange={({ target: { value } }) => handler(value)}
        style={styles}
      />
      {icon && icon !== "" && (
        <Icon
          icon={icon}
          onClick={() => iconHandler(model)}
          className={`absolute right-4 top-4.5 text-xl text-gray-800 ${iconClass}`}
        />
      )}
      {error !== "" && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
