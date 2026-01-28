import type { LucideProps } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router";

interface Props {
  menus: {
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    label: string;
    href: string;
  }[];
}
export default function FooterMenu({ menus }: Props) {
  const url = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center border-t border-gray-200 gap-2 bg-white">
      {menus.map((menu) => (
        <div
          onClick={() => navigate(menu.href)}
          key={menu.href}
          className="flex flex-col items-center w-full cursor-pointer p-3"
        >
          <menu.icon color={url.includes(menu.href) ? "#13A4EC" : "gray"} />
          <p
            className="text-sm"
            style={{ color: url.includes(menu.href) ? "#13A4EC" : "gray" }}
          >
            {menu.label}
          </p>
        </div>
      ))}
    </div>
  );
}
