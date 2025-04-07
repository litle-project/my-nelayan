import React from "react"
import { Icon } from "@iconify/react"

interface ILoading {
  status: boolean,
  message: string,
}

interface IProps {
  loading?: ILoading,
  label?: string,
  classes?: string,
  handler: () => void
}

const Button = (props: IProps) => {
  const {
    loading = { status: false, message: '' },
    label = 'Button',
    classes = '',
    handler,
  } = props
  
  return (
    <button
      className={`w-full py-2 cursor-pointer text-white ${classes} flex items-center gap-2 justify-center ${loading.status && 'bg-gray-400'}`}
      type="button"
      disabled={loading.status}
      onClick={handler}
    >
      {loading.status && <Icon icon="tdesign:loading" className="animate-spin text-white" />}
      <span>{label}</span>
    </button>
  )
}

export default Button