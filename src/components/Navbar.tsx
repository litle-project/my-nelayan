import React, { useState } from "react"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"

interface IProps {
  title?: string
}

const Navbar = (props: IProps) => {
  const router = useRouter()
  const {
    title = ''
  } = props

  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="rounded-b-xl px-7 py-10 bg-[#003766] text-white font-bold text-xl">
      <div className="flex justify-between">
        <span>{title}</span>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="cursor-pointer focus:outline-none">
            <Icon icon="ix:user-profile" className="text-2xl" />
          </button>
          <div className={`absolute z-50 top-7 right-0 ${!showMenu && 'hidden'}`}>
            <button
              className="bg-white cursor-pointer hover:bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-lg shadow-xl"
              onClick={() => router.push('/')}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar