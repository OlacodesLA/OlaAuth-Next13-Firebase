"use client";

import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { logoutUser } from "../services";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const Home = () => {
  const router: AppRouterInstance = useRouter();
  const { user }: any = useSelector((state: RootState) => state.profile);

  const logOut = () => {
    logoutUser(router);
  };
  console.log(router);
  return (
    <main className="">
      <div className="">Olacodes</div>

      <div className="text-white">{JSON.stringify(user, null, 2)}</div>
      <button className="text-white" onClick={() => logOut()}>
        Logout
      </button>
    </main>
  );
};

export default Home;
