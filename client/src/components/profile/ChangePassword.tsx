"use client";

import React, { useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ChangePasswordShema } from "@/validations/updateProfileValidate";

import { useUpdatePasswordMutation } from "@/features/user/userApi";

import Loader from "../loader/Loader";

type UpdatePasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const ChangePassword = () => {
  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordType>({
    resolver: yupResolver(ChangePasswordShema),
  });

  const onSubmit: SubmitHandler<UpdatePasswordType> = async (data) => {
    await updatePassword({
      newPassword: data.newPassword,
      oldPassword: data.oldPassword,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
    }
    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error]);
  return (
    <div className="w-full relative">
      <div className="flex items-center flex-col py-4 gap-4 md:border-b border-mauve10 dark:border-gray7 ">
        <h2 className="text-3xl font-semibold mt-5">Change Password</h2>
      </div>
      <div className="md:w-[70%] w-[95%] mx-auto h-full flex items-center  ">
        <div className="w-full">
          <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <Form.Field name="old-password" className="relative">
              <Form.Control asChild>
                <input
                  type="password"
                  {...register("oldPassword")}
                  placeholder="Enter current password"
                  className={`input-profile mb-8 ${
                    errors.oldPassword && "!border-red-500"
                  }`}
                />
              </Form.Control>
              <span className="text-red-500 font-[400] text-[14px] absolute bottom-2 left-0 ">
                {errors.oldPassword?.message}
              </span>
            </Form.Field>

            <Form.Field name="new-password" className="relative">
              <Form.Control asChild>
                <input
                  type="password"
                  {...register("newPassword")}
                  placeholder="Enter new password"
                  className={`input-profile mb-8 ${
                    errors.newPassword?.message && "!border-red-500 "
                  }  `}
                />
              </Form.Control>
              <span className="text-red-500 font-[400] text-[14px] absolute bottom-2 left-0 ">
                {errors.newPassword?.message}
              </span>
            </Form.Field>

            <Form.Field name="cofirm-password" className="relative">
              <Form.Control asChild>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Re-type new password"
                  className={`input-profile mb-3 ${
                    errors.confirmPassword && "!border-red-500"
                  }`}
                />
              </Form.Control>
              <span className="text-red-500 font-[500] text-[14px] absolute -bottom-2 left-0 ">
                {errors.confirmPassword?.message}
              </span>
            </Form.Field>
            <button className="button-auth !w-[200px]">Change Password</button>
          </Form.Root>
        </div>
      </div>
      {isLoading && (
        <div className="bg-blackA7 absolute w-full h-full flex items-center justify-center left-0 top-0">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
