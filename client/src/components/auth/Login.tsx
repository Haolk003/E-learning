import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  FC,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import Link from "next/link";
import { useLoadUserQuery } from "@/features/api/apiSlice";
import * as Form from "@radix-ui/react-form";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { BiLogoFacebookCircle, BiLogoFacebook } from "react-icons/bi";

import { useLoginUserMutation } from "@/features/auth/authApi";
import toast from "react-hot-toast";
import { skip } from "node:test";

type Inputs = {
  email: string;
  password: string;
};

type Props = {
  setRoute: Dispatch<SetStateAction<string>>;
  handleCloseModal: () => void;
};
const Shema = object({
  email: string().required().email("Invalid Email"),
  password: string()
    .required()
    .min(8, "Password must be at least 8 characters long"),
});
const Login: FC<Props> = ({ setRoute, handleCloseModal }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(Shema) });

  const router = useRouter();
  const [login, { isSuccess, error, isLoading }] = useLoginUserMutation();

  const googleLogin = () => {
    window.open(`${process.env.NEXT_PUBLIC_SERVER_API}google`, "self");
  };

  const faceBookLogin = () => {
    window.open(`${process.env.NEXT_PUBLIC_SERVER_API}facebook-login`, "self");
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login({ email: data.email, password: data.password });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Logged Successfully");

      handleCloseModal();
    }
    if (error && "data" in error) {
      const { message } = error.data as any;
      toast.error(message);
    }
  }, [isSuccess, error]);
  return (
    <div className="dark:text-white text-black w-full ">
      <h1 className="text-3xl text-center font-semibold mb-4">
        Login with Elearning
      </h1>

      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Field name="email" className="grid mb-[30px] mt-6 ">
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
        <Form.Field name="email" className="grid mb-[10px]">
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
          <button className="box-border w-full text-white  shadow-blackA4 hover:bg-blue10 inline-flex h-[40px] items-center justify-center rounded-[4px] bg-blue9 px-[15px]  font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[30px]">
            Login
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
        <p className="mt-3">
          Not have any account?{" "}
          <span
            className="text-blue9 cursor-pointer"
            onClick={() => setRoute("sign-up")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
