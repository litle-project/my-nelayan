/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import Image from "next/image";
import { Icon } from "@iconify/react";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import Print from "./Print";
import ReactDOM from "react-dom/client";

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
    QRCode.toDataURL(
      `${baseURL}/profile?identity=${data?.identity || ""}&name=${
        data?.name || ""
      }`
    )
      .then((url: string) => setQrCode(url))
      .catch((err: unknown) => console.error(err));
  };

  useEffect(() => {
    if (status) generateCode();
    if (envMode === "production")
      setCertified(`${basePath}/images/certified.png`);
  }, [status, envMode]);

  useEffect(() => () => setQrCode(""), []);

  const openPrintWindow = (data: any, qrCode: string, certified: string) => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Kartu</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @media print {
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          <div id="print-root"></div>
          <script>
            window.onafterprint = () => window.close();
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();

    const interval = setInterval(() => {
      const mountNode = printWindow.document.getElementById("print-root");
      if (mountNode) {
        clearInterval(interval);
        const root = ReactDOM.createRoot(mountNode);
        root.render(
          <Print data={data} qrCode={qrCode} certified={certified} />
        );
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500); // delay ensures render completes before print
      }
    }, 100);
  };

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
          <div
            className="bg-white p-4 flex flex-col gap-2 rounded-lg"
            style={{ border: "1px solid #d1d5db" }}
          >
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
                    <div className="flex md:flex-row flex-col md:gap-2 gap-1">
                      <span className="font-bold md:text-base text-sm text-black">
                        Nama:
                      </span>
                      <span className="md:text-base text-sm text-black">
                        {data?.name}
                      </span>
                    </div>
                    <div className="flex md:flex-row flex-col md:gap-2 gap-1">
                      <span className="font-bold md:text-base text-sm text-black">
                        Nomor Anggota:
                      </span>
                      <span className="md:text-base text-sm text-black">
                        {data?.identity}
                      </span>
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
                    <span className="font-bold md:text-base text-sm text-black">
                      {data?.identity}
                    </span>
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
                  onClick={() => openPrintWindow(data, qrCode, certified)}
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
