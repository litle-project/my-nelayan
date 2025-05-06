/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import QRCode from "qrcode";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface IUser {
  name: string;
  identity: string;
  logo?: string;
}

const Page = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV;

  const searchParams = useSearchParams();
  const slug = searchParams.get("identity");
  const name = searchParams.get("name");
  const router = useRouter();

  const [qrCode, setQrCode] = useState("");
  const [certified, setCertified] = useState("/images/certified.png");
  const [data, setData] = useState<IUser>({
    name: "",
    identity: "",
    logo:
      envMode === "production"
        ? `${basePath}/images/hnsi.png`
        : "/images/hnsi.png",
  });

  const generateCode = (code: string, name: string) => {
    setData((prev) => ({
      ...prev,
      name,
      identity: code || "",
    }));

    QRCode.toDataURL(
      `${baseURL}/profile?identity=${code || ""}&name=${name || ""}`
    )
      .then((url: string) => setQrCode(url))
      .catch((err: unknown) => console.error(err));
  };

  useEffect(() => {
    if (envMode === "production")
      setCertified(`${basePath}/images/certified.png`);
    if (slug && name) generateCode(slug, name);
    if (!slug) router.back();
  }, [envMode, slug]);

  useEffect(() => () => setQrCode(""), []);

  // useEffect(() => {
  //   const token = localStorage.getItem("cookies");
  //   if (!token) router.push("/");
  // }, []);

  return (
    <div className="flex justify-center w-full bg-black">
      <div className="lg:w-1/2 w-full h-full min-h-lvh relative bg-white">
        <Navbar title="Profil Saya" />
        <div className="xl:px-32 px-5 my-10">
          <div className="flex justify-center items-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
