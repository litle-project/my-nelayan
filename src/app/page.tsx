'use client'

import Layout from "@/app/layout"
import { Icon } from "@iconify/react"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  
  return (
    <Layout>
      <div className="flex justify-center w-full bg-black">
        <div className="lg:w-1/2 w-full h-full min-h-lvh relative bg-white">
          <div className="relative">
            <div className="bg-[#003766] rounded-br-5xl rounded-bl-7xl flex items-center justify-center pt-28 pb-64">
              <div className="flex flex-col items-center">
                <h1 className="text-white font-bold text-4xl">Halo</h1>
                <h2 className="text-white font-medium text-3xl">Selamat Datang!</h2>
              </div>
            </div>
            <div className="absolute flex mt-5 items-center justify-center top-64 w-full">
              <div className="flex flex-col items-center gap-10 shadow-xl rounded-xl bg-white py-20 px-5 md:w-1/2 w-sm">
                <span className="text-3xl font-extrabold">Login</span>
                <div className="flex flex-col gap-5 w-full">
                  <div className="relative">
                    <input type="text" className="rounded-full border-2 border-gray-400 w-full py-2 px-4" placeholder="Email" />
                    <Icon icon="iconamoon:email-bold" className="absolute right-4 top-3 text-xl text-gray-500" />
                  </div>
                  <div className="relative">
                    <input type="password" className="rounded-full border-2 border-gray-400 w-full py-2 px-4" placeholder="Password" />
                    <Icon icon="material-symbols:lock-outline" className="absolute right-4 top-3 text-xl text-gray-500" />
                  </div>
                </div>
                <Button
                  loading={{ status: false, message: '' }}
                  classes="bg-black rounded-full"
                  label="Login Sekarang"
                  handler={() => router.push('/dashboard')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page