/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useState, useEffect } from "react";

const NoSearch = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV;
  const [image, setImage] = useState("/images/default-home.png");

  useEffect(() => {
    if (envMode === "production") {
      setImage(`${basePath}/images/default-home.png`);
    }
  }, [envMode]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-[80%] object-fill">
          <Image
            src={image}
            width={100}
            height={100}
            alt="default"
            className="w-full object-contain"
          />
        </div>
        <div className="flex flex-col text-[#003766] items-center">
          <span className="font-bold text-xl">Belum Ada Data</span>
          <span>Mulai Pencarian Sekarang</span>
        </div>
      </div>
    </div>
  );
};

export default NoSearch;
