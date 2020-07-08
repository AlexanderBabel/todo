import React from "react";

export default function Button({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...props}
      className={`bg-blue-800 rounded-md py-2 px-8 font-bold text-white ${className}`}
    >
      {children}
    </button>
  );
}
