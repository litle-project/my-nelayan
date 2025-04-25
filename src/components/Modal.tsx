/* eslint-disable react-hooks/exhaustive-deps */

import Image from "next/image";
import { Icon } from "@iconify/react";
import QRCode from "qrcode";
import { useState, useEffect } from "react";

interface IProps {
  close: () => void;
  status?: boolean;
  data: {
    name: string;
    identity: string;
    logo?: string;
  } | null;
}

const Modal = (props: IProps) => {
  const { status = false, close, data } = props;

  const [qrCode, setQrCode] = useState("");
  const [certified, setCertified] = useState("/images/certified.png");
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV;

  const generateCode = () => {
    QRCode.toDataURL(`${baseURL}/profile?identity=${data?.identity || ""}`)
      .then((url: string) => setQrCode(url))
      .catch((err: unknown) => console.error(err));
  };

  useEffect(() => {
    if (status) generateCode();
    if (envMode === "production")
      setCertified(`${basePath}/images/certified.png`);
  }, [status, envMode]);

  useEffect(
    () => () => {
      setQrCode("");
    },
    []
  );

  return (
    <>
      <div
        className={`w-full h-auto min-h-lvh absolute bg-black/40 z-40 ${
          status ? "" : "hidden"
        }`}
      />
      <div
        className={`absolute top-20 h-auto w-full z-50 ${
          status ? "" : "hidden"
        }`}
      >
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
                <div className="bg-[#36b7ff] flex 2xl:w-lg w-full gap-10 2xl:px-4 px-2 py-2 justify-between border-b-8 border-[#d5efff]">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-black text-xs 2xl:text-xl xl:text-base">
                      Himpunan Nelayan Seluruh Indonesia
                    </span>
                    <span className="text-white text-xs 2xl:text-base xl:text-sm font-bold">
                      Kartu Tanda Anggota
                    </span>
                  </div>
                  {data?.logo && data?.logo !== "" && (
                    <span className="">
                      <Image
                        src={data.logo}
                        alt="logo"
                        width={40}
                        height={40}
                      />
                    </span>
                  )}
                </div>
                <div className="bg-white flex justify-between py-8 px-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <span className="font-bold">Nama:</span>
                      <span>{data?.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Nomor Anggota:</span>
                      <span>{data?.identity}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <div className="w-24 object-contain">
                      {qrCode !== "" && (
                        <Image
                          src={qrCode}
                          alt="code"
                          width={500}
                          height={500}
                          style={{ width: "100%", height: "auto" }}
                        />
                      )}
                    </div>
                    <span className="font-bold">{data?.identity}</span>
                  </div>
                </div>
              </div>
              <div className="2xl:w-lg sm:w-sm w-full object-contain">
                <Image
                  src={certified}
                  alt="certified"
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="flex w-full justify-end">
                <button
                  className="bg-black rounded-md px-2 py-1 text-white"
                  onClick={() => window.print()}
                >
                  Print Kartu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
