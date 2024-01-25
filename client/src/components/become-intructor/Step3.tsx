// Step3.tsx
import React from "react";

interface Step3Props {
  onFinish: () => void; // Function to finish the setup process
  onBack: () => void; // Function to go back to the previous step
}

const Step3: React.FC<Step3Props> = ({ onFinish, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Step 3: Course Creation Guidelines
      </h2>
      <p className="mt-4 text-gray-600">
        To ensure the highest quality learning experiences for students, we have
        some guidelines for creating your courses.
      </p>

      {/* Content for step 3 */}
      <ul className="list-disc pl-5 mt-4 text-gray-600">
        <li>Each course should have clear learning objectives and outcomes.</li>
        <li>
          Videos should be high-definition and clear, with good audio quality.
        </li>
        <li>
          Include interactive elements such as quizzes, assignments, and
          discussions.
        </li>
        <li>
          Provide supplemental resources like readings, slides, and project
          files.
        </li>
        <li>Update your content regularly to keep it current and engaging.</li>
      </ul>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          onClick={onFinish}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Step3;
