'use client'

import Layout from "@/app/layout"
import Image from "next/image"
import QRCode from "qrcode"
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navbar from "@/components/Navbar"

interface IUser {
  name: string,
  identity: string,
  logo?: string
}

const Page = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ''
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV
  
  const searchParams = useSearchParams()
  const slug = searchParams.get('identity')
  const router = useRouter()

  const [qrCode, setQrCode] = useState('')
  const [certified, setCertified] = useState('/images/certified.png');
  const [data, setData] = useState<IUser>({
    name: 'Ilham',
    identity: '',
    logo: envMode === 'production'
      ? `${basePath}/images/hnsi.png`
      : '/images/hnsi.png'
  })
  
  const generateCode = (code: string) => {
    setData((prev) => ({
      ...prev,
      identity: code || ''
    }))

    QRCode.toDataURL(`${baseURL}/profile?identity=${code || ''}`)
      .then((url: string) => setQrCode(url))
      .catch((err: unknown) => console.error(err));
  }

  useEffect(() => {
    if (envMode === 'production') setCertified(`${basePath}/images/certified.png`)
    if (slug) generateCode(slug)
    if (!slug) router.back()
  }, [envMode, slug]);

  useEffect(() => () => {
    setQrCode('')
  }, [])

  return (
    <Layout>
      <div className="flex justify-center w-full bg-black">
        <div className="lg:w-1/2 w-full h-full min-h-lvh relative bg-white">
          <Navbar title="Profil Saya" />
          <div className="xl:px-32 px-5 my-10">
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-2 rounded-lg">
                <div className="flex flex-col gap-2">
                  <span className="xl:text-2xl text-base">Anda Telah Terdaftar di Himpunan Nelayan Seluruh Indonesia</span>
                  <div className="flex flex-col bg-gray-200 p-1">
                    <div className="bg-linear-to-r from-[#004478] to-[#007EC5] flex 2xl:w-lg w-full gap-10 justify-end 2xl:px-4 px-2 py-2 relative">
                      <div className="flex flex-col -gap-1">
                        <span className="font-bold text-white text-xs 2xl:text-xl xl:text-base">Himpunan Nelayan Seluruh Indonesia</span>
                        <span className="text-white text-right text-xs 2xl:text-base xl:text-sm">Kartu Tanda Anggota</span>
                      </div>
                      {data?.logo && data?.logo !== '' && (
                        <span className="absolute z-10 2xl:top-12 top-7 left-3">
                          <Image
                            src={data.logo}
                            alt="logo"
                            width={40}
                            height={40}
                          />
                        </span>
                      )}
                    </div>
                    <div className="relative bg-white pt-10">
                      <span className="w-full">
                        <Image
                          src="images/bg-card.svg"
                          alt="bg-card"
                          width={1000}
                          height={500}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </span>
                      <div className="flex flex-col text-sm absolute z-10 top-10 left-3">
                        <span className="text-gray-800 text-xs 2xl:text-base xl:text-sm"><b>Nama:</b> {data?.name}</span>
                        <span className="text-gray-800 text-xs 2xl:text-base xl:text-sm"><b>Nomor Anggota:</b> {data?.identity || ''}</span>
                      </div>
                      <div className="absolute z-10 top-5 w-full">
                        <div className="flex justify-end 2xl:mr-22 mr-10">
                          <div className="flex flex-col items-center bg-white rounded-full py-2 px-4">
                            {qrCode && <Image src={qrCode} alt="QR Code" width={0} height={0} className="2xl:w-18 w-10 h-auto" />}
                            <span className="text-gray-800 text-xs font-bold">{data?.identity || ''}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Image src={certified} alt="certified" width={1000} height={500} style={{ width: "100%", height: "auto" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page