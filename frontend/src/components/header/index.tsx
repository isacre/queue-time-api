import React from "react";

interface Props {
  title: string;
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
}
function Header({ title, leftButton, rightButton }: Props) {
  return (
    <div className="flex justify-between items-center p-[19px] border-b border-gray-200 bg-white">
      <div id="leftButton">{leftButton}</div>
      <div className="font-bold text-[18px]" id="title">
        {title}
      </div>
      <div id="rightButton">{rightButton}</div>
    </div>
  );
}

export default React.memo(Header);
