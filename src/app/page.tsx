/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ScreenDetector from "@/utilities/screen-detector";
import { useDispatch } from "react-redux";
import { setMessage } from "@/services/redux/snakebar";

const Page = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV;

  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = ScreenDetector();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [image, setImage] = useState({
    bg: "images/bg-login.png",
    illustration: "images/illustration-login.png",
  });

  useEffect(() => {
    if (envMode === "production") {
      setImage({
        bg: `${basePath}/images/bg-login.png`,
        illustration: `${basePath}/images/illustration-login.png`,
      });
    }
  }, [envMode]);

  const submit = async () => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await response.json();

    if (data?.result) {
      localStorage.setItem("email", data.result.username);
      localStorage.setItem("cookies", data.result.cookies);
      router.push("/dashboard");
    } else {
      dispatch(setMessage("Email atau kata sandi salah. Silakan coba lagi."));
    }
  };

  return (
    <>
      <div className={`${isMobile ? "" : "hidden"} flex justify-center w-full`}>
        <div className="lg:w-1/2 w-full h-full min-h-lvh relative bg-white">
          <div className="relative">
            <div className="bg-[#2a4ea2] rounded-br-5xl rounded-bl-7xl flex items-center justify-center pt-28 pb-64">
              <div className="flex flex-col items-center">
                <h1 className="text-white font-bold text-4xl">Halo</h1>
                <h2 className="text-white font-medium text-3xl">
                  Selamat Datang!
                </h2>
              </div>
            </div>
            <div className="absolute flex mt-5 items-center justify-center top-64 w-full">
              <div className="flex flex-col items-center gap-10 shadow-xl rounded-xl bg-white py-20 px-5 md:w-1/2 w-sm">
                <span className="text-3xl font-extrabold text-[#2a4ea2]">
                  Login
                </span>
                <div className="flex flex-col gap-5 w-full">
                  <div className="relative">
                    <input
                      type="text"
                      className="rounded-full border-2 border-gray-400 w-full py-2 px-4"
                      placeholder="Email"
                    />
                    <Icon
                      icon="iconamoon:email-bold"
                      className="absolute right-4 top-3 text-xl text-gray-500"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      className="rounded-full border-2 border-gray-400 w-full py-2 px-4"
                      placeholder="Password"
                    />
                    <Icon
                      icon="material-symbols:lock-outline"
                      className="absolute right-4 top-3 text-xl text-gray-500"
                    />
                  </div>
                </div>
                <Button
                  loading={{ status: false, message: "" }}
                  classes="bg-[#2a4ea2] rounded-full"
                  label="Login Sekarang"
                  handler={() => submit()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          !isMobile ? "" : "hidden"
        } flex w-full justify-between bg-white min-h-lvh `}
      >
        <div className="relative w-[50%]">
          <Image
            alt="bg-login-1"
            src={image.bg}
            width={500}
            height={500}
            className="min-h-lvh"
            style={{ width: "100%", height: "100%" }}
          />
          <div className="absolute left-5 top-64 flex flex-col">
            <div className="2xl:w-[80%] w-[75%] object-fill">
              <Image
                alt="illustration"
                src={image.illustration}
                width={100}
                height={100}
                className="w-full h-full object-contain"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <span className="2xl:text-4xl xl:text-3xl text-2xl text-white/80 font-black">
              Himpunan Nelayan Seluruh Indonesia
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center flex-1 pb-24">
          <div className="flex flex-col gap-10 items-center">
            <span className="text-5xl text-[#2a4ea2] font-[1000] uppercase mb-10 tracking-wide">
              Login
            </span>
            <div className="flex flex-col w-[400px] group focus-within:text-[#2a4ea2] gap-2">
              <label
                className={`font-bold text-xl ${
                  form.email !== "" ? "text-[#2a4ea2]" : "text-gray-400"
                } group-focus-within:text-[#2a4ea2]`}
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Masukan Email"
                  className={`border-b-2 ${
                    form.email !== ""
                      ? "border-[#2a4ea2] text-[#2a4ea2]"
                      : "border-gray-300"
                  } placeholder-gray-400 py-1 w-full outline-none focus:border-[#2a4ea2]`}
                  onChange={({ target: { value } }) =>
                    setForm({ ...form, email: value })
                  }
                />
                <Icon
                  icon="quill:mail"
                  className={`absolute right-0 top-0 text-xl ${
                    form.email !== "" ? "text-[#2a4ea2]" : "text-gray-400"
                  } group-focus-within:text-[#2a4ea2]`}
                />
              </div>
            </div>
            <div className="flex flex-col w-[400px] group focus-within:text-[#2a4ea2] gap-2">
              <label
                className={`font-bold text-xl group-focus-within:text-[#2a4ea2] ${
                  form.password !== "" ? "text-[#2a4ea2]" : "text-gray-400"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`border-b-2 border-gray-300 placeholder-gray-400 py-1 w-full outline-none focus:border-[#2a4ea2] ${
                    form.password !== ""
                      ? "border-[#2a4ea2] text-[#2a4ea2]"
                      : "border-gray-300"
                  }`}
                  placeholder="Masukan Password"
                  onChange={({ target: { value } }) =>
                    setForm({ ...form, password: value })
                  }
                />
                <button
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <Icon
                      icon="basil:eye-closed-outline"
                      className={`text-xl group-focus-within:text-[#2a4ea2] ${
                        form.password !== ""
                          ? "text-[#2a4ea2]"
                          : "text-gray-400"
                      }`}
                    />
                  ) : (
                    <Icon
                      icon="iconamoon:eye-light"
                      className={`text-xl group-focus-within:text-[#2a4ea2] ${
                        form.password !== ""
                          ? "text-[#2a4ea2]"
                          : "text-gray-400"
                      }`}
                    />
                  )}
                </button>
              </div>
            </div>
            <Button
              loading={{ status: false, message: "" }}
              classes="bg-[#2a4ea2] rounded-full font-bold"
              label="Login Sekarang"
              handler={() => submit()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
