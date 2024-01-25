// Step2.tsx
import React from "react";

interface Step2Props {
  onNext: () => void; // Function to go to the next step
  onBack: () => void; // Function to go back to the previous step
}

const Step2: React.FC<Step2Props> = ({ onNext, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Step 2: Your Instructor Profile
      </h2>
      <p className="mt-4 text-gray-600">
        Creating a compelling instructor profile is crucial in connecting with
        your future students. Here's how to make your profile stand out.2
      </p>
      {/* Profile form or information goes here */}
      <div className="mt-8">
        {/* Example input for name */}
        <div className="my-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Headline
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 px-2 !h-[40px]  w-full rounded-md border-gray-300 bg-gray11 text-gray1 placeholder:text-gray8 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Headline"
          />
        </div>
        <div className="my-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 px-2 !h-[40px]  w-full rounded-md border-gray-300 bg-gray11 text-gray1 placeholder:text-gray8 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Bio"
          />
        </div>
        <div className="my-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Website
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 px-2 !h-[40px]  w-full rounded-md border-gray-300 bg-gray11 text-gray1 placeholder:text-gray8 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Website"
          />
        </div>
        {/* More inputs for profile setup */}
        {/* ... */}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Previous
        </button>
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

export default Step2;
