import React from "react";
import PieChart from "../highcharts/PieChart";
import BarChart from "../highcharts/Barchart";
import LineChart from "../highcharts/Linechart";
import Bubble from "../highcharts/Bubble";

import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";

const AllGraphs = () => {
  const navigate = useNavigate();

  const handlePower = () => {
    navigate("/oilfield_asset_marketplace");
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen w-[107em] mt-12">
      {/* Navbar */}
      <Navbar />

      <div className="p-6">
        {/* Close Button */}
        <div className="flex justify-end">
          <IoCloseCircleOutline
            className="mr-16 text-4xl text-[#21fc0d] cursor-pointer"
            onClick={handlePower}
          />
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
          {/* Green Electricity Produced */}
          <div className="bg-[#383a43] w-[720px] ml-24 shadow-lg   ">
            <div className="pb-2 mb-4">
              <h3 className="text-2xl text-center text-[#21fc0d] border-[2px] h-14 border-[#21fc0d] pt-3">
                Green Electricity Produced in MWh
              </h3>
            </div>
            <BarChart height="250px" width="100%" />
          </div>

          {/* Total Projects Trends */}
          <div className="bg-[#383a43] w-[720px] shadow-lg  ">
            <div className="pb-2 mb-4">
              <h3 className="text-xl text-center  h-14 text-[#21fc0d] border-[2px] border-[#21fc0d] pt-3">
                Total Projects Trends
              </h3>
            </div>
            <LineChart height="250px" width="100%" />
          </div>

          {/* Token Sales Volume (Bubble) */}
          <div className="bg-[#383a43] w-[720px] ml-24 shadow-lg   ">
            <div className="pb-2 mb-4">
              <h3 className="text-xl text-center  h-14 text-[#21fc0d] border-[2px] border-[#21fc0d] pt-3">
                Token Sales Volume
              </h3>
            </div>
            <Bubble height="250px" width="100%" />
          </div>

          {/* Token Sales Volume (Pie) */}
          <div className="bg-[#383a43] w-[720px] shadow-lg   ">
            <div className="pb-2 mb-4">
              <h3 className="text-xl text-center  h-14 text-[#21fc0d] border-[2px] border-[#21fc0d] pt-3">
                Token Sales Volume
              </h3>
            </div>
            <PieChart height="250px" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllGraphs;
