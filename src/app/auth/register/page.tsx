"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import { IRegistrationValues } from "@/src/interfaces/components";
import { DefaultButton, PasswordField, TextField } from "@/src/components";
import { registerSchema } from "@/src/schemas";
import { motion } from "framer-motion";
import StaggerChildren, {
  childVariants,
} from "@/src/animations/staggerChildren";
import { registerUser } from "@/src/services";
import AuthLayout from "@/src/layout/authLayout";
import { useTransition } from "react";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: IRegistrationValues, actions: any) => {
    registerUser(values, router, setIsLoading);
  };

  const { handleChange, errors, touched, handleSubmit, values, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        password2: "",
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  return (
    <AuthLayout>
      <div>SignUp</div>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-2 ">
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
          <motion.div
            variants={childVariants}
            className="flex gap-2 items-start"
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
            <PasswordField
              name="password2"
              placeholder="Confirm Password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.password2}
              error={errors.password2}
              touched={touched.password2}
            />
          </motion.div>
          <motion.div variants={childVariants}>
            <DefaultButton
              type="submit"
              isLoading={isLoading}
              label="Create Account"
            />
          </motion.div>
        </StaggerChildren>
      </form>
    </AuthLayout>
  );
}
