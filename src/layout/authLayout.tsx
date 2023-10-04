"use client";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="relative app-container h-screen bg-black overflow-hidden flex justify-center items-end pb-10">
      <div className="absolute inset-0 top-40 flex flex-col w-full items-center">
        <div className="w-[400px]">{children}</div>
      </div>
      <div className="absolute -bottom-[calc(100vh-180px)]">
        <div className="ball  bottom-0"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
