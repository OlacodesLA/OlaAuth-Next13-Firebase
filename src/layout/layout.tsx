"use client";
import React, { useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { setUser } from "../store/slice/profileSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        console.log(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <div>{children}</div>;
};

export default AppLayout;
