"use client";

import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import StarterKit from "@tiptap/starter-kit";

import { useEditor } from "@tiptap/react";
import { updateProfileSchema } from "@/validations/updateProfileValidate";
import { yupResolver } from "@hookform/resolvers/yup";

import Editor from "../ui/editor/Editor";
import { useAppSelector } from "@/store/hook";

import { useUpdateProfileMutation } from "@/features/user/userApi";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";

type ProfileUpdateType = {
  firstName: string;
  lastName: string;
  headline?: string;
  bio?: string;
  linkedin?: string;
  facebookLink?: string;
  youtubeLink?: string;
  twitterLink?: string;
  website?: string;
};

const ProfileInfo = () => {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateType>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      bio: user?.bio || "",
      headline: user?.headline ? user.headline : "",
      linkedin: user?.linkedin || "",
      facebookLink: user?.facebookLink || "",
      twitterLink: user?.twitterLink || "",
      youtubeLink: user?.youtubeLink || "",
      website: user?.website || "",
    },
    resolver: yupResolver(updateProfileSchema),
  });
  const [updateProfile, { isSuccess, error, isLoading }] =
    useUpdateProfileMutation();
  const [counterHeadline, setCouterHeadline] = useState(60);
  const [formError, setFormError] = useState({});
  const editor = useEditor({
    extensions: [StarterKit],
    content: user?.bio || ``,
    onUpdate: () => {
      setFormError((prev) => {
        return { ...prev, content: "" };
      });
    },
  });
  const onSubmit: SubmitHandler<ProfileUpdateType> = async (data) => {
    const html = editor?.getHTML();

    await updateProfile({ ...data, bio: html });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile Updated Successfully");
    }
    if (error && "data" in error) {
      const errMessage = error as any;
      toast.error(errMessage.data.message);
    }
  }, [isSuccess, error]);
  return (
    <div className="w-full border border-mauve10 border-l-0 dark:border-iris2 dark:text-white text-black relative">
      <div className="flex items-center flex-col py-4 gap-4 border-b border-mauve10 dark:border-iris2">
        <h2 className="text-3xl font-semibold">Public profile</h2>
        <p className="text-md">Add informaion about yourself</p>
      </div>
      <div className="md:w-[80%] w-[95%] mx-auto py-4">
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <h4 className="text-md font-[500]">Basics:</h4>
          {/* first name */}
          <div className="flex items-center gap-3 w-full justify-between my-4">
            <Form.Field name="firstName" className="w-full relative">
              <Form.Control asChild>
                <input
                  type="text"
                  {...register("firstName")}
                  className="input-profile "
                  placeholder="First Name"
                />
              </Form.Control>
              <span className="text-[12px] font-thin text-red-600 absolute -bottom-5 left-0">
                {errors.firstName?.message}
              </span>
            </Form.Field>

            {/* last name */}
            <Form.Field name="firstName" className="w-full relative">
              <Form.Control asChild>
                <input
                  type="text"
                  className="input-profile"
                  {...register("lastName")}
                  placeholder="Last Name"
                />
              </Form.Control>
              <span className="text-[12px] font-thin text-red-600 absolute -bottom-5 left-0">
                {errors.lastName?.message}
              </span>
            </Form.Field>
          </div>
          <Form.Field name="headline" className="w-full mt-7 mb-3">
            <Form.Control asChild>
              <div className="relative">
                <input
                  type="text"
                  className="input-profile"
                  {...register("headline")}
                  placeholder="Head line"
                />
                <span className="absolute right-2 top-[50%] -translate-y-1/2 !font-[300] text-gray6 ">
                  {counterHeadline}
                </span>
              </div>
            </Form.Control>
            <span className="text-[12px] font-thin text-red-600 absolute -bottom-5 left-0">
              {errors.headline?.message}
            </span>
            <Form.Message className="text-[12px] font-thin text-gray6">
              Add a professional headline like,Instructor at Elearning or
              Architect.
            </Form.Message>
          </Form.Field>
          <Form.Field name="description">
            <Form.Control asChild>
              <Editor editor={editor} />
            </Form.Control>
            <Form.Message className="text-[12px] font-thin text-gray6">
              Links and coupon codes are not permitted in this section.
            </Form.Message>
          </Form.Field>

          <h4 className="font-[500] text-lg mt-4">Links:</h4>
          <Form.Field name="linkedin" className="mt-2">
            <Form.Control asChild>
              <input
                className="w-full h-[50px] px-4 border border-black dark:border-white bg-transparent tracking-wide "
                placeholder="Website (http(s)://..)"
                {...register("website")}
              />
            </Form.Control>
            <span className="text-[12px] font-thin text-red-600 absolute -bottom-5 left-0">
              {errors.website?.message}
            </span>
          </Form.Field>

          <Form.Field name="linkedin" className="mt-5">
            <Form.Control asChild>
              <div className="border border-black dark:border-white w-full h-12 flex">
                <div className="h-full border-r bg-blue3 dark:bg-blackA2 dark:text-white text-black border-black dark:border-white md:w-[40%] w-[60%] flex items-center justify-center">
                  http://www.linkedin.com/
                </div>
                <input
                  className="md:w-[60%] w-[40%] h-full px-4 border-none outline-none bg-transparent tracking-wide "
                  placeholder="LinkedIn Profile"
                  {...register("linkedin")}
                />
              </div>
            </Form.Control>
            <span className="text-[12px] font-thin text-red-600 absolute -bottom-5 left-0">
              {errors.linkedin?.message}
            </span>
            <Form.Message className="text-[12px] font-thin text-gray6">
              Input your LinkedIn resource id(e.g.in/johnsmith).
            </Form.Message>
          </Form.Field>

          <Form.Field name="facebookLink" className="mt-5">
            <Form.Control asChild>
              <div className="border border-black dark:border-white w-full h-12 flex">
                <div className="h-full md:w-[40%]  border-r bg-blue3 dark:bg-blackA2 dark:text-white border-black dark:border-white w-[60%] flex items-center justify-center">
                  http://www.facebook.com/
                </div>
                <input
                  className="md:w-[60%] w-[40%] h-full px-4 border-none outline-none bg-transparent tracking-wide "
                  placeholder="Facebook Profile"
                  {...register("facebookLink")}
                />
              </div>
            </Form.Control>
            <Form.Message className="text-[12px] font-thin text-gray6">
              Input your Facebook username (e.g.johnsmith)
            </Form.Message>
          </Form.Field>

          <Form.Field name="twitterLink" className="mt-5">
            <Form.Control asChild>
              <div className="border border-black dark:border-white w-full h-12 flex">
                <div className="h-full border-r bg-blue3 dark:bg-blackA2 dark:text-white border-black dark:border-white w-[60%] flex items-center justify-center md:w-[40%] ">
                  http://www.twitter.com/
                </div>
                <input
                  className="w-[40%] md:w-[60%] h-full px-4 border-none outline-none bg-transparent tracking-wide "
                  placeholder="Twitter Profile"
                  {...register("twitterLink")}
                />
              </div>
            </Form.Control>
            <Form.Message className="text-[12px] font-thin text-gray6">
              Add your Twitter username (e.g.johnsmith)
            </Form.Message>
          </Form.Field>

          <Form.Field name="youtubeLink" className="mt-5">
            <Form.Control asChild>
              <div className="border border-black dark:border-white w-full h-12 flex">
                <div className="h-full border-r bg-blue3 dark:bg-blackA2 dark:text-white border-black dark:border-white md:w-[40%] w-[60%] flex items-center justify-center">
                  http:/www.youtube.com/
                </div>
                <input
                  className="md:w-[60%] w-[40%] h-full px-4 border-none outline-none bg-transparent tracking-wide "
                  placeholder="Youtube Profile"
                  {...register("youtubeLink")}
                />
              </div>
            </Form.Control>
            <Form.Message className="text-[12px] font-thin text-gray6">
              Add your youtube username (e.g.johnsmith)
            </Form.Message>
          </Form.Field>

          <button className="button-auth !w-[100px]">Save</button>
        </Form.Root>
      </div>
      {isLoading && (
        <div className="bg-blackA7 absolute w-full h-full flex items-center justify-center left-0 top-0">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
