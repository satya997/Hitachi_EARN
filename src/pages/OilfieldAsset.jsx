import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import OilfieldHeader from "../components/OilfieldHeader";
import Map from "../highcharts/Map";
import Table from "../components/Table";
import Card from "../components/Card1";
import axios from "axios";
import Barchart from "../highcharts/Barchart";
import Linechart from "../highcharts/Linechart";
import Footer from "../components/Footer";
// import nextpage from "../assets/Images1/4.png";
import { useNavigate } from "react-router-dom";
import { getAllCardApi } from "../apis/service";

const OilfieldAsset = () => {
  const [marketplaceData, setMarketplaceData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newProject, setNewProject] = useState([]);
  const [newMint, setNewMint] = useState([]);
  const [newBuy, setNewBuy] = useState([]);

  const fetchData = async () => {
    try {
      // Sending request to the API
      const response = await getAllCardApi();

      setMarketplaceData(response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // console.log(marketplaceData);

  const checkStatus = async (prj) => {
    try {
      const response = await fetch(
        `http://103.204.95.218:8000/hiam/projects/get-status/${prj}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.projectStatus;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();

  const handleGraph = () => {
    navigate("/graphs");
  };

  console.log("jhgjytdjy", marketplaceData?.prj_id)

  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <div className="flex w-full h-full">
        <OilfieldHeader />
      </div>
      <div className="flex w-full h-full">
        <Map />
        <div className="h-105 w-full overflow-y-scroll bg-custom-dark  p-1 flex flex-wrap  h-[28rem] mt-1 rounded-lg">
          {marketplaceData?.length === 0 ? (
            <p className="text-center text-gray-500">No projects available.</p>
          ) : (
            marketplaceData?.map((item) => (
              <Card
                prj_id={item.prj_id}
                prj_name={item.prj_name}
                description={item.prj_description}
                start={item.prj_start_date}
                end={item.prj_end_date}
                status={item.prj_status}
                nft={item.prj_nft_id}
                onInternalShow={() => {
                  console.log(`Internal show clicked for project: ${item.id}`);
                }}
                onUpdateInternal={() => {
                  console.log(
                    `Update internal clicked for project: ${item.id}`
                  );
                }}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex mt-2 gap-1 h-[40%] w-[100%] ">
        <Table className="w-[60%] h-[50%]" />
        <div className="flex flex-col w-[60.5vw]">
          <h2 className="text-[#21fc0d] text-center font-poppins min-w-[316px] m-0 text-[27px] font-normal border-2 border-[#21fc0d] flex justify-around bg-gray-700 py-2">
            Tokenization Trend Analysis
            <span className="flex w-[5%] mr-[-14rem]">
              <img
                src={"/images/4.png"}
                onClick={() => handleGraph()}
                className="w-[2rem] h-8 left-0 ml-[30rem]] cursor-pointer"
              />
            </span>
          </h2>
          <span className="flex w-full">
            <Barchart height="25vh" width="50%" />
            <Linechart height="25vh" width="50%" />
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OilfieldAsset;
