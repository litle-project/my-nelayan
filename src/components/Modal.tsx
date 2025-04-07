import Image from "next/image"
import { Icon } from "@iconify/react"
import QRCode from "qrcode";
import { useState, useEffect } from "react"

interface IProps {
  close: () => void,
  status?: boolean,
  data: {
    name: string,
    identity: string,
    logo?: string
  } | null
}

const Modal = (props: IProps) => {
  const {
    status = false,
    close,
    data,
  } = props
  
  const [qrCode, setQrCode] = useState('')
  const [certified, setCertified] = useState('/images/certified.png');
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ''
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV
  
  const generateCode = () => {
    QRCode.toDataURL(`${baseURL}/profile/${data?.identity || ''}`)
      .then((url: string) => setQrCode(url))
      .catch((err: unknown) => console.error(err));
  }

  useEffect(() => {
    if (status) generateCode()
    if (envMode === 'production') setCertified(`${basePath}/images/certified.png`)
  }, [status, envMode]);

  useEffect(() => () => {
    setQrCode('')
  }, [])

  return (
    <>
      <div
        className={`w-full h-auto min-h-lvh absolute bg-black/40 z-40 ${status ? '' : 'hidden'}`}
      />
      <div className={`absolute top-1/3 h-auto w-full z-50 ${status ? '' : 'hidden'}`}>
        <div className="w-full flex justify-center items-center">
          <div className="bg-white p-4 flex flex-col gap-2 rounded-lg">
            <div className="w-full flex justify-end">
              <Icon
                icon="fontisto:close"
                className="text-xl flex items-end justify-end text-gray-800"
                onClick={() => close()}
              />
            </div>
            <div className="flex flex-col gap-2">
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
                    <span className="text-gray-800 text-xs 2xl:text-base xl:text-sm"><b>Nomor Anggota:</b> {data?.identity}</span>
                  </div>
                  <div className="absolute z-10 top-5 w-full">
                    <div className="flex justify-end 2xl:mr-22 mr-10">
                      <div className="flex flex-col items-center bg-white rounded-full py-2 px-4">
                        {qrCode && <Image src={qrCode} alt="QR Code" width={0} height={0} className="2xl:w-18 w-10 h-auto" />}
                        <span className="text-gray-800 text-xs font-bold">{data?.identity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Image src={certified} alt="certified" width={0} height={0} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal