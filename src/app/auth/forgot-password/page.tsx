"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import { IForgotValues } from "@/src/interfaces/components";
import { DefaultButton, PasswordField, TextField } from "@/src/components";
import { forgotPasswordSchema } from "@/src/schemas";
import { motion } from "framer-motion";
import StaggerChildren, {
  childVariants,
} from "@/src/animations/staggerChildren";
import { signIn } from "next-auth/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/src/config/firebase";
import AuthLayout from "@/src/layout/authLayout";
import { forgotUserPassword } from "@/src/services";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: IForgotValues, actions: any) => {
    const { email } = values;
    setIsLoading(true);
    console.log("clicked");

    forgotUserPassword(values, router, setIsLoading);

    await setIsLoading(false);
  };

  const { handleChange, errors, touched, handleSubmit, values, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPasswordSchema,
      onSubmit,
    });

  return (
    <AuthLayout>
      <div>SignIn</div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <StaggerChildren>
          <motion.div variants={childVariants} className="">
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

          <motion.div variants={childVariants}>
            <DefaultButton
              type="submit"
              isLoading={isLoading}
              label="Forgot Password"
            />
          </motion.div>
        </StaggerChildren>
      </form>
    </AuthLayout>
  );
}
