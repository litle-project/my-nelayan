"use client";

import Cookies from "js-cookie";
import Empty from "@/components/Empty";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import Default from "@/components/Default";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import ScreenDetector from "@/utilities/screen-detector";
import QRCode from "qrcode";
import moment from "moment";
import { useRouter } from "next/navigation";

interface IUser {
  name: string;
  identity: string;
  logo?: string;
  date: string;
}

const Page = () => {
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const router = useRouter();
  const { isMobile } = ScreenDetector();
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [modal, setModal] = useState({
    status: false,
    content: "",
  });

  const generateCode = (identity: string, name: string) => {
    QRCode.toDataURL(`${baseURL}/profile?identity=${identity}&name=${name}`)
      .then((url: string) => setQrCode(url))
      .catch((err: unknown) => console.error(err));
  };

  const findUser = async (keyword = "") => {
    setLoading(!loading);
    const cookie = Cookies.get("cookies");
    const response = await fetch(`/api/user?nik=${keyword}&cookie=${cookie}`, {
      method: "GET",
    });
    const data = await response.json();

    if (data?.data) {
      const { identity, name, join_date } = data.data;
      generateCode(identity, name);
      setUser({
        identity,
        name,
        date: moment(join_date).format("DD MMM, YYYY"),
        logo:
          envMode === "production"
            ? `${basePath}/images/hnsi.png`
            : "/images/hnsi.png",
      });
    } else {
      setUser(null);
    }

    setLoading(false);
    if (!firstRender) setFirstRender(true);
  };

  useEffect(() => {
    const token = Cookies.get("cookies");
    if (!token) router.push("/");
  }, []);

  return (
    <>
      <div
        className={`${
          isMobile ? "" : "hidden"
        } flex justify-center w-full bg-black`}
      >
        <div className="lg:w-1/2 w-full h-full min-h-lvh relative bg-white">
          <Modal
            data={user}
            status={modal.status}
            close={() => setModal({ status: false, content: "" })}
          />

          <Navbar title="HNSI" />
          <div className="absolute top-20 w-full xl:px-20 px-2">
            <Input
              type="number"
              eventKey={(param: string) => findUser(param)}
              handler={() => {}}
              placeholder="Cari berdasarkan NIK..."
              classes="rounded-full shadow-md [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              icon={!loading ? "material-symbols:search" : "tdesign:loading"}
              iconClass={loading ? "animate-spin" : "cursor-pointer"}
              iconHandler={(param: string) => findUser(param)}
              styles={{
                background: "#ffffff",
                border: "1px solid #d1d5db",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                color: "#4B5563",
              }}
            />
          </div>
          <div className="xl:px-32 px-5 mt-20">
            {user ? (
              <div
                className="rounded-lg shadow-md border-2 border-gray-100 flex flex-col p-4 gap-2"
                style={{ border: "1px solid #d1d5db" }}
              >
                <span className="text-gray-800">
                  Hasil Untuk: <b>{user?.identity}</b>
                </span>
                <Icon
                  icon="prime:id-card"
                  className="text-6xl text-center mx-auto text-gray-400"
                />
                <span
                  role="button"
                  onClick={() => setModal({ status: true, content: "id-card" })}
                  className="text-blue-400 hover:underline text-sm text-right cursor-pointer"
                >
                  Tampilkan Kartu Anggota
                </span>
              </div>
            ) : (
              firstRender && <Empty />
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          !isMobile ? "" : "hidden"
        } flex flex-col gap-10 bg-white min-h-lvh`}
      >
        <Modal
          data={user}
          status={modal.status}
          close={() => setModal({ status: false, content: "" })}
        />
        <Navbar title="Himpunan Nelayan Seluruh Indonesia" />
        <div className="2xl:px-96 xl:px-72 px-24 flex flex-col gap-10 bg-white">
          <Input
            type="number"
            eventKey={(param: string) => findUser(param)}
            handler={() => {}}
            placeholder="Cari berdasarkan NIK..."
            classes="rounded-xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
            icon={!loading ? "material-symbols:search" : "tdesign:loading"}
            iconClass={loading ? "animate-spin" : "cursor-pointer"}
            iconHandler={(param: string) => findUser(param)}
          />
          <div className="flex flex-col gap-5">
            {!firstRender ? (
              <Default />
            ) : user ? (
              <div className="p-4 bg-[#2a4ea2] rounded-xl flex justify-between">
                <Image
                  src={qrCode}
                  alt="QR Code"
                  width={100}
                  height={100}
                  className="w-24 h-auto"
                />
                <div className="w-px h-24 bg-white"></div>
                <div className="grid grid-cols-5 text-white gap-5 items-center w-[80%]">
                  <div className="flex flex-col text-center">
                    <span>Nama</span>
                    <span className="text-xl font-bold">{user?.name}</span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span>No Registrasi</span>
                    <span className="text-xl font-bold">{user?.identity}</span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span>Tanggal Bergabung</span>
                    <span className="text-xl font-bold">{user?.date}</span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span>Verified Member</span>
                    <span className="text-xl font-bold">Verified</span>
                  </div>
                  <button
                    onClick={() =>
                      setModal({ status: true, content: "id-card" })
                    }
                    className="text-white pl-4 border-l border-white h-24 flex items-center hover:underline cursor-pointer"
                  >
                    Tampilkan Kartu
                  </button>
                </div>
              </div>
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
