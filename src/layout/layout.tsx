"use client";
import React, { useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  setFirstName,
  setLastName,
  setEmail,
} from "../store/slice/profileSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useRouter } from "next/navigation";
import { getUserById } from "../services/profileServices";
import { getCookie } from "cookies-next";
import { IProfilePayload } from "../interfaces/components/profile";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async () => {
      const uid = getCookie("userId");
      if (uid) {
        try {
          const user: IProfilePayload | null = await getUserById(uid);
          if (user) {
            const { firstName, lastName, email } = user;
            dispatch(setFirstName(firstName));
            dispatch(setLastName(lastName));
            dispatch(setEmail(email));
            console.log(user);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getUser();
  }, [dispatch]);

  return <div>{children}</div>;
};

export default AppLayout;
