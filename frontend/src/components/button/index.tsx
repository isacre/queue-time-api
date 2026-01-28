import type { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
      {...props}
    >
      {props.children}
    </button>
  );
}
