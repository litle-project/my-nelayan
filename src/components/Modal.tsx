import Image from "next/image"
import { Icon } from "@iconify/react"

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
  
  return (
    <>
      <div
        className={`w-full h-full min-h-lvh absolute bg-black/40 z-40 ${status ? '' : 'hidden'}`}
      />
      <div className={`absolute top-1/3 h-full w-full z-50 ${status ? '' : 'hidden'}`}>
        <div className="w-full flex justify-center items-center">
          <div className="bg-white p-4 flex flex-col gap-2 rounded-lg">
            <div className="w-full flex justify-end">
              <Icon
                icon="fontisto:close"
                className="text-xl flex items-end justify-end"
                onClick={() => close()}
              />
            </div>
            <div className="flex flex-col bg-gray-200 p-1">
              <div className="bg-[#37b6ff] flex w-full justify-between gap-10 items-center px-4 py-2">
                <div className="flex flex-col -gap-1">
                  <span className="font-bold text-white text-xs 2xl:text-base xl:text-sm">Kartu Tanda Anggota</span>
                  <span className="font-bold text-xs 2xl:text-base xl:text-sm">Himpunan Nelayan Seluruh Indonesia</span>
                </div>
                {data?.logo && data?.logo !== '' && (
                  <Image src={data.logo} alt="logo" width={50} height={50} />
                )}
              </div>
              <div className="px-4 bg-[#d5effe] p-2"></div>
              <div className="bg-white py-6 px-2 flex justify-between gap-4 items-center">
                <div className="flex flex-col text-sm">
                  <span className="text-xs 2xl:text-base xl:text-sm"><b>Nama:</b> {data?.name}</span>
                  <span className="text-xs 2xl:text-base xl:text-sm"><b>Nomor Anggota:</b> {data?.identity}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Icon className="text-2xl 2xl:text-6xl xl:text-4xl text-gray-600" icon="wpf:qrcode" />
                  <span className="text-xs font-bold">{data?.identity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal