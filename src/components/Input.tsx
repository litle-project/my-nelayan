import React from "react"
import { Icon } from "@iconify/react"

interface IProps {
  type?: string,
  error?: string,
  placeholder?: string,
  handler: (param: string) => void,
  eventKey?: (param: string) => void,
  classes?: string,
  icon?: string | null
}

const Input = (props: IProps) => {
  const {
    type = 'text',
    handler,
    error = '',
    eventKey = () => {},
    classes = '',
    placeholder = 'Input here',
    icon = null,
  } = props

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    if (event.key === "Enter") {
      eventKey(inputValue)
    }
  };

  return (
    <div className="flex flex-col relative">
      <input
        type={type}
        className={`
          ${classes} w-full px-4 h-10 bg-gray-50 border 
          placeholder-gray-700 text-sm text-gray-800
          focus:outline-1 ${error !== '' ? 'border-red-500' : 'border-gray-300'}
        `}
        placeholder={placeholder}
        onKeyUp={handleKeyDown}
        onChange={({ target: { value } }) => handler(value)}
      />
      {icon && icon !== '' && (
        <Icon icon={icon} className="absolute right-4 top-3 text-xl text-gray-800" />
      )}
      {error !== '' && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}

export default Input