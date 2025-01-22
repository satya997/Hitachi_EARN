import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
// import { AiFillWindows } from "react-icons/ai";
import {FaMicrosoft} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuStatus, setMenuStatus] = useState(false);

  const handleMenuClick = () => {
    setMenuStatus(!menuStatus);
  };

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handlePower = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleWindow = () => {
    navigate("/microdashboard");
  };

  const url = window.location.href;
  const extractedString = url.split("/").pop();

  return (
    <div className="fixed top-0 h-[5%] z-50 flex items-center justify-between w-full px-4 py-2 bg-black">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <RxHamburgerMenu
          className="text-2xl cursor-pointer text-[#21fc0d] "
          onClick={handleMenuClick}
        />
        <FaMicrosoft
          className="text-2xl text-[#21fc0d] cursor-pointer"
          onClick={handleWindow}
        />
      </div>

      {/* Center Section */}
      <h6 className="text-2xl font-medium text-center text-white font-poppins whitespace-nowrap">
        Hitachi-EARN [<b><u>E</u></b>nterprise <b><u>A</u></b>sset-based{" "}
        <b><u>R</u></b>evenue <b><u>N</u></b>etwork]
        {extractedString === "wellpshoperations-dash"
          ? "Hitachi Industrial Asset Monetization (HIAM) System - Operations"
          : ""}
      </h6>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <FaUser className="text-2xl text-[#21fc0d] cursor-pointer" />
        <h6 className="text-base text-white font-poppins">
          {role === "true" ? "Investor" : "PO-1"}
        </h6>
        <IoMdSettings className="text-2xl text-[#21fc0d] cursor-pointer" />
        <FaPowerOff
          className="text-2xl text-[#21fc0d] cursor-pointer"
          onClick={handlePower}
        />
      </div>
    </div>
  );
}

export default Navbar;
