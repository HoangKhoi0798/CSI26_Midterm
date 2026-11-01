"use client"; 

import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({
  label,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
