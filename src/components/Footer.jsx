import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 z-10 flex flex-col items-center justify-center w-full bg-transparent">
      <p className="text-white text-[0.7rem] rounded-[20px] bg-black px-2 py-1 mb-[-5]">
        © Hitachi America, Ltd. 2024. All Rights Reserved
      </p>
      <hr className="w-full bg-black h-[0.3rem] opacity-100" />
    </div>
  );
};

export default Footer;
