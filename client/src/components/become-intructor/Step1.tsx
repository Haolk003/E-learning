// Step1.tsx
import React from "react";

interface Step1Props {
  onNext: () => void; // Function to go to the next step
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Step 1: Welcome to the Instructor Program
      </h2>
      <p className="mt-1">
        <span className="text[16px] font-semibold">
          Interact with Your Students:
        </span>{" "}
        Answer their questions, provide feedback, and create a community of
        learners.
      </p>
      <p className="mt-1">
        <span className="text-[16px] font-semibold">
          Track Your Performance:
        </span>{" "}
        Our analytics tools will help you monitor your courses' performance,
        understand your students' needs, and optimize your content for better
        engagement.
      </p>
      <p className="mt-1">
        <span className="text-[16px] font-semibold ">Earn Revenue:</span>
        Monetize your expertise and earn income for every student who enrolls in
        your courses. We are thrilled to have you with us, and we're here to
        support you every step of the way. Get started by creating your first
        course today!
      </p>
      <p className="mt-2 text-gray-600">
        In the next steps, we'll guide you through setting up your instructor
        profile, creating your first course, and understanding how to engage
        effectively with your students.
      </p>

      {/* Navigation button */}
      <div className="mt-8">
        <button
          onClick={onNext}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
