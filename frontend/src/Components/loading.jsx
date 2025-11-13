import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-20 h-20">
        {/* Outer Gradient Ring */}
        <div
          className="absolute inset-0 rounded-full border-8 border-t-transparent animate-spin"
          style={{
            borderTopColor: "transparent",
            borderRightColor: "#9333ea",
            borderBottomColor: "#3b82f6",
            borderLeftColor: "#9333ea",
            borderStyle: "solid",
          }}
        ></div>

        {/* Inner White Circle */}
        <div className="absolute inset-2 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
