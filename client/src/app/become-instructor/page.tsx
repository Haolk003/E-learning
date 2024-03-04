"use client";

import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaUpload,
  FaRegCheckCircle,
} from "react-icons/fa";
import Step1 from "@/components/become-intructor/Step1";
import Step2 from "@/components/become-intructor/Step2";
import Step3 from "@/components/become-intructor/Step3";
import { useRouter } from "next/navigation";

import { useBecomeInstructorMutation } from "@/features/user/userApi";
import { useEditReviewMutation } from "@/features/review/reviewApi";
import ErrorHandle from "../../../../server/src/utils/errorHandle";

const BecomeInstructorProcess = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const steps = [
    { step: 1, title: "Start Application", icon: <FaChalkboardTeacher /> },
    { step: 2, title: "Upload Documents", icon: <FaUpload /> },
    { step: 3, title: "Verification", icon: <FaRegCheckCircle /> },
    // Add more steps if needed
  ];

  const StepDisplay = ({
    step,
    title,
    icon,
  }: {
    step: number;
    title: string;
    icon: React.ReactNode;
  }) => (
    <div
      className={`flex items-center p-4 ${
        currentStep >= step ? "text-blue-500" : "text-gray-500"
      }`}
    >
      <div className="text-3xl">{icon}</div>
      <div className="ml-4">
        <p className="text-xl">{title}</p>
        {currentStep >= step && <FaRegCheckCircle className="text-green-500" />}
      </div>
    </div>
  );

  const [becomeInstructor, { isLoading, error, isSuccess }] =
    useBecomeInstructorMutation();
  const handleNextStep = () => {
    // ... existing logic
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    // ... existing logic
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async () => {
    // Logic to finalize the instructor setup
    becomeInstructor("");
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/instructor");
    }

    if (error && "data" in error) {
      const errorMessage = error.data as any;
      throw new Error(errorMessage.message);
    }
  }, [error, isSuccess]);
  return (
    <div className="w-[800px] container mx-auto my-8 text-black">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-center mb-4">
            Become an Instructor
          </h1>
          <p className="text-lg text-center text-gray-600">
            Follow the steps below to start teaching today!
          </p>
        </div>
        <div className="divide-y divide-gray-300">
          {steps.map((s) => (
            <div key={s.title}>
              <StepDisplay key={s.step} {...s} />
              {s.step === 1 && currentStep === 1 && (
                <Step1 onNext={handleNextStep} />
              )}
              {s.step === 2 && currentStep === 2 && (
                <Step2 onNext={handleNextStep} onBack={handlePrevStep} />
              )}
              {s.step === 3 && currentStep === 3 && (
                <div>
                  <Step3 onBack={handlePrevStep} onFinish={handleFinish} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructorProcess;
