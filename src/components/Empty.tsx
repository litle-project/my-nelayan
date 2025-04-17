/* eslint-disable react-hooks/exhaustive-deps */

import { Icon } from "@iconify/react";
import Image from "next/image";
import ScreenDetector from "@/utilities/screen-detector";
import React, { useState, useEffect } from "react";

const Empty = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV;

  const { isMobile } = ScreenDetector();
  const [image, setImage] = useState("/images/not-found.png");

  useEffect(() => {
    if (envMode === "production") setImage(`${basePath}/images/bg-login.png`);
  }, [envMode]);

  return (
    <div className="flex justify-center">
      <div
        className={`flex flex-col items-center gap-4 ${!isMobile && "hidden"}`}
      >
        <Icon
          icon="fontisto:close"
          className={`text-4xl text-gray-400 ${isMobile && "hidden"}`}
        />
        <span className="font-bold text-gray-400">Data Tidak Ditemukan</span>
      </div>
      <div
        className={`flex flex-col items-center gap-4 ${isMobile && "hidden"}`}
      >
        <div className="w-[80%] object-contain">
          <Image
            src={image}
            height={100}
            width={100}
            className="w-full object-fill"
            alt="not-found"
          />
        </div>
        <div className="flex flex-col items-center text-[#003766]">
          <span className="text-xl font-bold">Data Tidak Ditemukan</span>
          <span>Coba Dengan Keyword Lainnya</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;
