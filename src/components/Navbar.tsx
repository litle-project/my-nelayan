/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import ScreenDetector from "@/utilities/screen-detector";
import Image from "next/image";

interface IProps {
  title?: string;
}

const Navbar = (props: IProps) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV;

  const { isMobile } = ScreenDetector();
  const router = useRouter();
  const [logo, setLogo] = useState("/images/hnsi.png");
  const { title = "" } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [account, setAccount] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (envMode === "production") setLogo(`${basePath}/images/bg-login.png`);
  }, [envMode]);

  const logout = () => {
    localStorage.removeItem("cookies");
    localStorage.removeItem("email");
    router.push("/");
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (name && name !== "" && email && email !== "")
      setAccount({ email, name });
  }, []);

  return (
    <div
      className={`rounded-b-xl ${
        isMobile ? "py-10 px-7" : "py-5 px-10"
      } bg-[#2a4ea2] text-white font-bold text-xl`}
    >
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <Image
            src={logo}
            width={100}
            height={100}
            className={`w-12 object-contain ${isMobile && "hidden"}`}
            alt="logo"
          />
          <span className="text-wrap max-w-64">{title}</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`cursor-pointer focus:outline-none ${
              !isMobile && "hidden"
            }`}
          >
            <Icon icon="mdi:user" className="text-2xl" />
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`flex gap-5 ${isMobile && "hidden"}`}
          >
            <div className="flex flex-col items-end text-white">
              <span className="text-xl">{account.name}</span>
              <span className="text-base font-medium">{account.email}</span>
            </div>
            <div className="bg-white p-4 rounded-full">
              <Icon icon="mdi:user" className="text-2xl text-[#003766]" />
            </div>
          </button>
          <div
            className={`absolute z-50 top-7 right-0 ${!showMenu && "hidden"}`}
          >
            <button
              className="bg-white cursor-pointer hover:bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-lg shadow-xl"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
