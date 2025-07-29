import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
