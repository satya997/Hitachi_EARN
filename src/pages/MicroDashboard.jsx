import React from "react";
import { dashboard } from "../utils/utils";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";

const MicroDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="w-screen h-screen mt-12  bg-[#171f31] min-h-screen  ">
      <div className="navbar1">
        <Navbar />
      </div>
      <div className="grid h-[88%] grid-cols-6  gap-5 p-10 min-h-[600px] w-screen overflow-y-hidden">
        {dashboard.map((card) => (
          <div
            key={card.id}
            className="flex flex-col justify-start items-center h-[95%]  text-center  w-[85%] cursor-pointer border-4 border-[#21fc0d] transition duration-300 ease-in-out bg-[#060A13] hover:bg-[#448b3d] rounded-3xl ml-5"
            onClick={() => handleNavigation(card.link)}
          >
            <img
              src={card.icon}
              alt={card.title}
              className="flex  justify-center items-center w-[140px] h-[150px]"
            />
            <p className="px-2 text-sm text-center text-white">{card.title}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MicroDashboard;
