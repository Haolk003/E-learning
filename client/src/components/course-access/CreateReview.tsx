"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Rating from "../ui/Rating";
import NewRating from "../ui/NewRating";
import * as Dialog from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useCreateReviewMutation } from "@/features/review/reviewApi";
import toast from "react-hot-toast";
type Props = {
  courseId: string;
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
};
const CreateReview: React.FC<Props> = ({
  courseId,
  isOpenModal,
  setIsOpenModal,
  refetch,
}) => {
  const [CreateReview, { isLoading, isSuccess, error }] =
    useCreateReviewMutation();
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [contentReview, setContentReview] = useState("");
  const [hoverValueRating, setHoverValueRating] = useState(0);
  const handleClose = () => {
    setOpen(false);
  };
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleCreateReview = async () => {
    CreateReview({
      comment: contentReview,
      courseId: courseId,
      rating: rating,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("You have successfully evaluated the course");
      refetch();
      setIsOpenModal(false);
    }
  }, [isSuccess]);
  return (
    <div>
      <Dialog.Root
        open={isOpenModal}
        onOpenChange={(open) => setIsOpenModal(open)}
      >
        <Dialog.Portal>
          <Dialog.Overlay
            className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0"
            onClick={handleClose}
          />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed  max-h-[85vh]  max-w-[450px] e p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none min-h-[400px] w-[420px]   top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-bg-slidebar-profile rounded-lg z-[100]">
            <div className="min-h-[400px] w-[420px]  absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-bg-slidebar-profile rounded-lg z-[100]">
              <ScrollArea>
                <div className="p-4 h-full">
                  <div>
                    <button
                      className="absolute right-2 top-2 dark:text-white text-black text-2xl"
                      onClick={() => setIsOpenModal(false)}
                    >
                      <AiOutlineCloseCircle />
                    </button>
                    <div>
                      <div className="flex flex-col items-center justify-center gap-5 h-[400px]">
                        <h2 className="text-2xl font-semibold">
                          How would you rate this course?
                        </h2>
                        <p>
                          {hoverValueRating === 1 &&
                            "Awfull, not what I expected at all "}
                          {hoverValueRating === 2 &&
                            "Pool, pretty disappointed"}
                          {hoverValueRating === 3 && "Average, could be better"}
                          {hoverValueRating === 4 && "Good, what I expected"}
                          {hoverValueRating === 5 &&
                            "Amazing,above expectations!"}
                          {hoverValueRating === 0 && "Select Rating"}
                        </p>
                        <NewRating
                          step={step}
                          rating={rating}
                          setRating={setRating}
                          hoverValue={hoverValueRating}
                          setHoverValue={setHoverValueRating}
                          handleNextStep={handleNextStep}
                        />
                        {step === 2 && (
                          <div className="w-full">
                            <textarea
                              value={contentReview}
                              onChange={(e) => setContentReview(e.target.value)}
                              className="w-full px-4 py-3 h-[100px] bg-gray5 rounded-md"
                              placeholder="Tell us about your own personal experience taking this course.Was it a good match for you ?"
                            />
                          </div>
                        )}
                        {step === 2 && (
                          <button
                            className="absolute right-2 bottom-2 dark:bg-blue10 py-3 rounded-md px-4"
                            onClick={handleCreateReview}
                          >
                            Save and Exist
                          </button>
                        )}
                      </div>
                    </div>
                    {step === 2 && (
                      <button
                        className="text-violet10 absolute left-3 top-3 "
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </button>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default CreateReview;
