"use client";

import React, { useCallback, useEffect, useState } from "react";
import Croppper, { Area, Point } from "react-easy-crop";
import { FaRegUserCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import CropImage from "../ui/CropImage";
import { useUpdateAvatarMutation } from "@/features/user/userApi";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/hook";
import Loader from "../loader/Loader";

interface FileWithProgress extends File {
  progress?: number;
}
const ProfilePhoto = () => {
  const [updateAvatar, { isLoading, isSuccess, error }] =
    useUpdateAvatarMutation();
  const user = useAppSelector((state) => state.auth.user);
  const [selectedFile, setSelectFile] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [isCrop, setIsCrop] = useState(false);
  const [croppedImage, setCroppedImage] = useState<any>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const onDrop = useCallback((acceptedFiles: FileWithProgress[]) => {
    const file = acceptedFiles[0];

    setSelectFile(URL.createObjectURL(file));
    setIsCrop(true);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg"],
    },
    multiple: false,
  });
  const onCropComplete = useCallback(
    (croppedArea: Area, cropAreaPixels: Area) => {
      setCroppedAreaPixels(cropAreaPixels);
    },
    []
  );
  const showCroppedImage = useCallback(async () => {
    if (selectedFile && croppedAreaPixels) {
      const cropped: any = await CropImage(selectedFile, croppedAreaPixels, 0);
      if (cropped) {
        setCroppedImage(cropped);
        setCroppedAreaPixels(null);
        setSelectFile(null);
        setIsCrop(false);
      }
    }
  }, [selectedFile, croppedAreaPixels]);

  const handleUpdateAvatar = async () => {
    if (croppedImage) {
      const formData = new FormData();
      formData.append("myFile", croppedImage);
      await updateAvatar(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Avatar updated successfully");
      setCroppedImage(null);
    }
    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error]);
  return (
    <div className="w-full relative">
      <div className="flex items-center flex-col py-4 gap-4 border-b border-mauve10 dark:border-iris2">
        <h2 className="text-3xl font-semibold">Photo</h2>
        <p className="text-md">
          Add a nice photo of yourself for your profile.
        </p>
      </div>
      <div className="w-[60%] mx-auto py-4">
        <h5 className="font-[500] text-[17px]">Image preview</h5>
        <div className="border border-black overflow-hidden relative dark:border-white w-full h-[300px] flex items-center justify-center mt-3">
          {selectedFile && isCrop ? (
            <div className="w-full h-full">
              <Croppper
                image={selectedFile}
                crop={crop}
                aspect={3 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />
            </div>
          ) : user?.avatar ? (
            <Image
              src={user.avatar.url}
              alt=""
              fill
              className="h-full object-contain"
            />
          ) : (
            <FaRegUserCircle className="text-8xl" />
          )}
          {croppedImage && !selectedFile && (
            <Image
              src={URL.createObjectURL(croppedImage)}
              alt=""
              fill
              className="h-full object-contain"
            />
          )}
        </div>

        {!croppedAreaPixels && (
          <h5 className="font-[500] text-[17px] my-4">Add / Change Image</h5>
        )}
        {!croppedAreaPixels && (
          <div
            className="flex w-full border dark:border-white border-black h-[50px] relative"
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              className="w-full h-full absolute bg-transparent cursor-pointer"
            />
            <div className="w-[80%] h-full flex items-center px-4">
              No file selected
            </div>
            <button className="w-[20%] h-full text-center border-l border-black dark:border-white ">
              Upload image
            </button>
          </div>
        )}
        {croppedAreaPixels && (
          <button
            className="w-[100px] h-[60px] border border-black dark:border-white mt-4"
            onClick={showCroppedImage}
          >
            Crop
          </button>
        )}
        {!croppedAreaPixels && (
          <button
            className="button-auth !w-[100px]"
            onClick={handleUpdateAvatar}
            disabled={!croppedImage}
          >
            Save
          </button>
        )}
      </div>
      {isLoading && (
        <div className="bg-blackA7 absolute w-full h-full flex items-center justify-center left-0 top-0">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
