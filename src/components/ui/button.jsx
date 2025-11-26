import React from "react";

export const Button = ({ className = "", children, ...props }) => {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
