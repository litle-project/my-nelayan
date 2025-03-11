import { Icon } from "@iconify/react"
import React from "react"

const Empty = () => (
  <div className="flex justify-center">
    <div className="flex flex-col items-center gap-4">
      <Icon icon="fontisto:close" className="text-4xl text-gray-400" />
      <span className="font-bold text-gray-400">Data Tidak Ditemukan</span>
    </div>
  </div>
)

export default Empty