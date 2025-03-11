import React from "react"

interface IProps {
  title?: string
}

const Navbar = (props: IProps) => {
  const {
    title = ''
  } = props

  return (
    <div className="rounded-b-xl px-7 py-10 bg-[#FAE89A] text-yellow-700 font-bold text-xl">
      {title}
    </div>
  )
}

export default Navbar