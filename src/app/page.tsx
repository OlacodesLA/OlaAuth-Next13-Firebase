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
  const { firstName, lastName, email }: any = useSelector(
    (state: RootState) => state.profile
  );

  const logOut = () => {
    logoutUser(router);
  };

  console.log(router);
  return (
    <main className="p-5 mx-auto max-w-4xl text-white">
      <header className="">
        <nav className="flex justify-between ">
          <div className="text-xl font-bold">
            OlaAuth{" "}
            <span className="bg-red-500 p-1 rounded-md">Firebase🔥 </span>{" "}
          </div>
          <button className="text-white font-bold" onClick={() => logOut()}>
            Logout
          </button>
        </nav>
      </header>
      <div className="mt-20">
        <div className="text-white text-center">
          {firstName} {lastName}
        </div>
        <div className="md:text-3xl text-2xl">
          Firebase Authentication & Storage{" "}
          <span className=" text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            v9
          </span>{" "}
          <span className="font-bold text-lg md:text-xl bg-purple-600 p-1">
            NextJs 13.5
          </span>
        </div>
        <ol className="list-decimal mt-3 ml-5 text-base sm:text-lg">
          <li>Email Password Authentication,</li>
          <li>Google Sign In,</li>
          <li>Forgot Password,</li>
          <li>Customized Reset password page,</li>
          <li>Protected Routes Middleware,</li>
          <li>Form Validation using Formik & Yup,</li>
          <li>Store Users on Login, </li>
          <li>Toast Notification,</li>
          <li>Custom Error Hanlders,</li>
          <li>Loading Indicators etc.</li>
        </ol>
      </div>
    </main>
  );
};

export default Home;
