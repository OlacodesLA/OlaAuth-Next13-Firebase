"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import { ILoginValues } from "@/src/interfaces/components";
import { DefaultButton, PasswordField, TextField } from "@/src/components";
import { loginSchema, registerSchema } from "@/src/schemas";
import { motion } from "framer-motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import StaggerChildren, {
  childVariants,
} from "@/src/animations/staggerChildren";
import { signIn } from "next-auth/react";
import Sharingan from "@/src/components/loader/sharingan";
import AuthLayout from "@/src/layout/authLayout";
import Link from "next/link";
import useAppDispatch from "@/src/hooks/useAppDispatch";
import { loginUser, loginWithGoogle } from "@/src/services";
import toast from "react-hot-toast";
import useMounted from "@/src/utils";
import type { NextRouter } from "next/router";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router: AppRouterInstance = useRouter();
  const mounted = useMounted();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: ILoginValues, actions: any) => {
    setIsLoading(true);
    console.log("clicked");
    await loginUser(values, router, setIsLoading);
  };

  const onGoogle = async () => {
    loginWithGoogle(router);
  };

  const { handleChange, errors, touched, handleSubmit, values, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });
  console.log(errors);
  return (
    <AuthLayout>
      <div className="text-white font-semibold text-4xl mb-4 text-center">
        Login
      </div>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-2 ">
        <StaggerChildren>
          <motion.div variants={childVariants} className="mb-3">
            <TextField
              type="email"
              placeholder="Email"
              name="email"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
          </motion.div>
          <motion.div
            variants={childVariants}
            className="flex gap-2 items-start mb-2"
          >
            <PasswordField
              name="password"
              placeholder="Password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />
          </motion.div>
          <motion.div variants={childVariants}>
            <DefaultButton
              type="submit"
              isLoading={isLoading}
              label="Create Account"
            />
          </motion.div>

          <motion.div variants={childVariants}>
            <div className="flex justify-between mt-2">
              <div className="text-white text-sm">
                Dont have an Account?{" "}
                <Link className="text" href="/auth/register">
                  Register
                </Link>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-white">
                Forgot Password
              </Link>
            </div>
          </motion.div>
          <motion.div variants={childVariants}>
            <div className="">
              <button type="button" onClick={onGoogle}>
                Sign in with Google
              </button>
            </div>
          </motion.div>
        </StaggerChildren>
      </form>

      {/* <Sharingan /> */}
    </AuthLayout>
  );
}
