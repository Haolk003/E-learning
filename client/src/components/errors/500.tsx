"use client";

import AnimatedBackground from "./AnimatedBackground";

const ErrorPage: React.FC = () => {
  return (
    <div className="relative w-screen h-screen text-white">
      <AnimatedBackground />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-9xl font-bold mb-4">500</h1>
        <p className="text-2xl mb-4">
          Oops 😓, The page you are looking for is not available.
        </p>
        <p>
          We are sorry for the inconvenience, The page you are trying to access
          has been removed or never been existed.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
