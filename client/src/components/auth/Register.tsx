import React, { Dispatch, SetStateAction, useEffect, FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { FcGoogle } from "react-icons/fc";

import { BiLogoFacebook } from "react-icons/bi";

import { useRegisterUserMutation } from "@/features/auth/authApi";
import toast from "react-hot-toast";

type Inputs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type Props = {
  setRoute: Dispatch<SetStateAction<string>>;
};
const Shema = object({
  email: string().required().email("Invalid Email"),
  password: string()
    .required()
    .min(8, "Password must be at least 8 characters long"),
  firstName: string().required(),
  lastName: string().required(),
});
const Register: FC<Props> = ({ setRoute }) => {
  const [registerUser, { isSuccess, error, isLoading }] =
    useRegisterUserMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(Shema) });

  const googleLogin = () => {
    window.open(`${process.env.NEXT_PUBLIC_SERVER_API}google`, "self");
  };

  const faceBookLogin = () => {
    window.open(`${process.env.NEXT_PUBLIC_SERVER_API}facebook-login`, "self");
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await registerUser({ ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Created Successfully");
      setRoute("verify");
    }
    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error]);
  return (
    <div className="dark:text-white text-black w-full ">
      <h1 className="text-3xl text-center font-semibold mb-4">
        Join to Becodemy
      </h1>

      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Field name="firstName" className="grid mb-[10px] ">
          <div className="flex items-baseline justify-between mb-2">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white ">
              Enter Your First Name
            </Form.Label>
            <p className="text-[13px] text-red-500 opacity-[0.8]">
              {errors.firstName?.message}
            </p>
          </div>
          <Form.Control asChild>
            <input
              type="text"
              {...register("firstName")}
              className="box-border w-full shadow-gray3 bg-transparent dark:shadow-gray7 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white dark:hover:shadow-[0_0_0_1px_white] dark:focus:shadow-[0_0_0_2px_white]"
            />
          </Form.Control>
        </Form.Field>

        {/* lastname */}
        <Form.Field name="lastName" className="grid mb-[10px] ">
          <div className="flex items-baseline justify-between mb-2">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white ">
              Enter Your Last Name
            </Form.Label>
            <p className="text-[13px] text-red-500 opacity-[0.8]">
              {errors.lastName?.message}
            </p>
          </div>
          <Form.Control asChild>
            <input
              type="text"
              {...register("lastName")}
              className="box-border w-full shadow-gray3 bg-transparent dark:shadow-gray7 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white dark:hover:shadow-[0_0_0_1px_white] dark:focus:shadow-[0_0_0_2px_white]"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="email" className="grid mb-[10px] ">
          <div className="flex items-baseline justify-between mb-2">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white ">
              Enter Your Email
            </Form.Label>
            <p className="text-[13px] text-red-500 opacity-[0.8]">
              {errors.email?.message}
            </p>
          </div>
          <Form.Control asChild>
            <input
              type="email"
              {...register("email")}
              className="box-border w-full shadow-gray3 bg-transparent dark:shadow-gray7 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white dark:hover:shadow-[0_0_0_1px_white] dark:focus:shadow-[0_0_0_2px_white]"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="password" className="grid mb-[10px]">
          <div className="flex items-baseline justify-between mb-2">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Enter your Password
            </Form.Label>
            <p className="text-[13px] text-red-500 opacity-[0.8]">
              {errors.password?.message}
            </p>
          </div>
          <Form.Control asChild>
            <input
              type="password"
              {...register("password")}
              className="box-border w-full shadow-gray3 bg-transparent dark:shadow-gray7 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white dark:hover:shadow-[0_0_0_1px_white] dark:focus:shadow-[0_0_0_2px_white]"
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button
            disabled={isLoading}
            className="box-border w-full text-white disabled:opacity-50  shadow-blackA4 hover:bg-blue10 inline-flex h-[40px] items-center justify-center rounded-[4px] bg-blue9 px-[15px]  font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[30px]"
          >
            Register
          </button>
        </Form.Submit>
      </Form.Root>
      <div className="flex items-center flex-col mt-3">
        <p className="mt-4">Or join with</p>
        <div className="flex items-center gap-4 text-2xl mt-2">
          <button onClick={googleLogin}>
            <FcGoogle />
          </button>

          <button
            className=" rounded-full bg-[#4267B2] p-[2px] flex items-center justify-center"
            onClick={faceBookLogin}
          >
            <BiLogoFacebook className="text-white" />
          </button>
        </div>
        <p className="mt-2">
          Not have any account?{" "}
          <span className="text-blue9" onClick={() => setRoute("sign-in")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
