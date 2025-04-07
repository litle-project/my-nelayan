'use client'

import Layout from "@/app/layout"
import Empty from "@/components/Empty"
import Input from "@/components/Input"
import Navbar from "@/components/Navbar"
import Modal from "@/components/Modal"
import { Icon } from "@iconify/react"
import { useState } from 'react'

interface IUser {
  name: string,
  identity: string,
  logo?: string
}

const Page = () => {
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const [firstRender, setFirstRender] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)
  const [modal, setModal] = useState({
    status: false,
    content: ''
  })

  const findUser = (keyword = '') => {
    if (keyword.length > 4) {
      setUser({
        name: 'Ilham',
        identity: keyword,
        logo: envMode === 'production'
          ? `${basePath}/images/hnsi.png`
          : '/images/hnsi.png'
      })
    }
    
    else setUser(null)

    if (!firstRender) setFirstRender(true)
  }

  return (
    <Layout>
      <div className="flex justify-center w-full bg-black">
        <div className="lg:w-1/2 w-full h-full min-h-lvh relative bg-white">
          <Modal
            data={user}
            status={modal.status}
            close={() => setModal({ status: false, content: '' })}
          />
        
          <Navbar title="HNSI" />
          <div className="absolute top-20 w-full xl:px-20 px-2">
            <Input
              type="number"
              eventKey={(param: string) => findUser(param)}
              handler={() => {}}
              placeholder="Masukan No. KTP"
              classes="rounded-full shadow-md [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              icon="material-symbols:search"
            />
          </div>
          <div className="xl:px-32 px-5 mt-20">
            {
              user ? (
                <div className="rounded-lg shadow-md border-2 border-gray-100 flex flex-col p-4 gap-2">
                  <span className="text-gray-800">Hasil Untuk: <b>{user?.identity}</b></span>
                  <Icon icon="prime:id-card" className="text-6xl text-center mx-auto text-gray-400" />
                  <span
                    role="button"
                    onClick={() => setModal({ status: true, content: 'id-card' })}
                    className="text-blue-400 hover:underline text-sm text-right cursor-pointer"
                  >
                    Tampilkan Kartu Anggota
                  </span>
                </div>
              ) 
              : firstRender && <Empty />
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page