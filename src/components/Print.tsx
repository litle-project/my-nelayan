/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

const Print = ({
  data,
  qrCode,
  certified,
}: {
  data: any;
  qrCode: string;
  certified: string;
}) => {
  return (
    <div
      style={{ width: "500px" }}
      className="flex justify-center items-center"
    >
      <div
        className="bg-white p-4 flex flex-col gap-2 rounded-lg"
        style={{ border: "1px solid #d1d5db" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col bg-gray-200 p-1">
            <div
              style={{ background: "#36b7ff" }}
              className="flex gap-10 2xl:px-4 px-2 py-2 justify-between border-b-8 border-[#d5efff]"
            >
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
                  <Image src={data.logo} alt="logo" width={40} height={40} />
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
        </div>
      </div>
    </div>
  );
};

export default Print;
