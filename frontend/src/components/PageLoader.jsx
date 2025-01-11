import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-50">
      <div
        className="w-12 h-12 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"
        role="status"
        aria-label="Loading..."
      ></div>
    </div>
  );
};

export default PageLoader;
