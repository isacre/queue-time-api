import type { InputHTMLAttributes } from "react";

export default function Text(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="border border-gray-300 rounded-md p-2 w-full"
      {...props}
    />
  );
}
