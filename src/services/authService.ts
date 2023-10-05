"use client";
import { setEmail } from "../store/slice/profileSlice";
import {
  Auth,
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter, type NextRouter } from "next/router";
import { auth } from "../config/firebase";
import {
  IForgotValues,
  ILoginValues,
  IRegistrationValues,
  IResetValues,
} from "../interfaces/components";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookie, setCookie } from "cookies-next";
import useMounted from "../utils";
import { getFirebaseErrorMessage } from "../utils/errorHandler";

export const registerUser = async (
  values: IRegistrationValues,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void
) => {
  const { email, password } = values;
  setIsLoading(true);
  createUserWithEmailAndPassword(auth as Auth, email, password)
    .then((response) => {
      console.log(response);
      toast.success("Account created successfully");
      setIsLoading(false);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    })
    .catch((error) => {
      console.error(error.message);
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      setIsLoading(false);
      return error;
    });
};

export const loginUser = (
  values: ILoginValues,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void
) => {
  const { email, password } = values;
  setIsLoading(true);

  signInWithEmailAndPassword(auth as Auth, email, password)
    .then((userCredentials) => {
      if (userCredentials.user) {
        setCookie("auth", "true", {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setIsLoading(false);
        toast.success("Successfully Logged In");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.error(error.message);
      console.log(error.code);
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      setIsLoading(false);
    });
};

export const logoutUser = async (router: AppRouterInstance) => {
  try {
    await signOut(auth);
    deleteCookie("auth", { path: "/" });
    router.refresh();
  } catch (error) {
    console.error(error);

    return error;
  }
};

export const loginWithGoogle = (router: AppRouterInstance) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth as Auth, provider)
    .then((userProvider) => {
      if (userProvider.user) {
        setCookie("auth", "true", {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
      toast.success("Successfully Logged In");
      setTimeout(() => {
        router.push("/");
      }, 2000);
      console.log(userProvider);
    })
    .catch((error) => {
      console.error(error.message);
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      return error;
    });
};

export const resetUserPassword = (
  values: IResetValues,
  oobCode: string,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void
) => {
  const { newPassword } = values;
  setIsLoading(true);

  confirmPasswordReset(auth as Auth, oobCode, newPassword)
    .then((userCredentials) => {
      console.log(userCredentials);
      toast.success("Password has been changed you can now login");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error(error.message);
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      setIsLoading(false);
    });
};

export const forgotUserPassword = (
  values: IForgotValues,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void
) => {
  const { email } = values;
  setIsLoading(true);

  sendPasswordResetEmail(auth as Auth, email, {
    url: "http://localhost:3000/auth/login",
  })
    .then((userCredentials) => {
      console.log(userCredentials);
      toast.success("Email s ent, check yout email");
      setIsLoading(false);
    })
    .catch((error) => {
      console.error(error.message);
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      setIsLoading(false);
    });
};
