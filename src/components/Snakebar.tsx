/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { setMessage } from "@/services/redux/snakebar";
import { useSelector, useDispatch } from "react-redux";

const Snakebar = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.snakebar.message);

  useEffect(() => {
    if (message !== "") setTimeout(() => dispatch(setMessage("")), 3000);
  }, [message]);

  return (
    <div
      className={`absolute right-5 top-5 py-2 px-4 rounded-md text-white bg-red-500 ${
        message === "" && "hidden"
      }`}
    >
      {message}
    </div>
  );
};

export default Snakebar;
