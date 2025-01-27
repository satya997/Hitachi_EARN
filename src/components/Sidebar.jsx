import React, { useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

const Sidebar = ({ onClose, prj_id, updateClick }) => {
  const navigate = useNavigate();
  const [activeItems, setActiveItems] = useState({
    projectInformation: false,
    soulBoundAsset: false,
    images: false,
    documents: false,
    liveVerification: false,
    assetPackage: false,
    projectValuation: false,
    investmentProposal: false,
    projectNFTs: false,
    fractionalOwnership: false,
    projectOperationsLive: false,
  });

  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [isSoulBoundAssetOpen, setIsSoulBoundAssetOpen] = useState(false);
  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("/images/group-1.png");

  const toggleItem = (item) => {
    setActiveItems((prev) => {
      const newState = { ...prev };

      // Deactivate all items except the clicked one
      Object.keys(newState).forEach((key) => {
        newState[key] = key === item;
      });

      if (item === "images") {
        // Defer navigation to avoid modifying state during render
        setTimeout(() => {
          navigate("/oilfield_asset_marketplace?prj=prj-images");
        }, 0);
      }

      // Special handling for Project Information and its children
      if (item === "projectInformation") {
        navigate("/oilfield_asset_marketplace");
        setIsProjectInfoOpen(!isProjectInfoOpen);
        setCurrentImage(
          !isProjectInfoOpen ? "/images/group-2.png" : "/images/group-1.png"
        );
      } else if (
        item === "soulBoundAsset" ||
        item === "images" ||
        item === "documents" ||
        item === "liveVerification"
      ) {
        newState.projectInformation = true;
        if (item === "soulBoundAsset") {
          setIsSoulBoundAssetOpen(!isSoulBoundAssetOpen);
        } else {
          newState.soulBoundAsset = true;
        }
        if (item === "images") {
          setIsImagesOpen(!isImagesOpen);
        }
      } else {
        setIsProjectInfoOpen(false);
        setIsSoulBoundAssetOpen(false);
        setIsImagesOpen(false);
      }

      return newState;
    });
  };

  return (
    <div className="w-1/2 bg-[#4a4a4a] p-4 h-[726px]  space-y-7">
      <ul className="space-y-4 text-sm">
        {/* projectInformation */}
        <li
          className={`cursor-pointer ${
            activeItems.projectInformation ? "text-[#21fc0d]" : "text-white"
          }`}
          onClick={() => toggleItem("projectInformation")}
        >
          <div className="flex items-center space-x-2">
            {isProjectInfoOpen ? (
              <IoIosArrowDropdown className="w-7 h-7 text-[#21fc0d]" />
            ) : (
              <IoIosArrowDropright className="w-7 h-7 text-[#21fc0d]" />
            )}
            <img
              src={"/images/Frame-148.png" || "/placeholder.svg"}
              alt="Dropdown Icon"
              className="h-6 w-6 !ml-4"
            />
            <span className="!ml-4 text-xl">Project Information</span>
          </div>
        </li>
        {isProjectInfoOpen && (
          <ul className="ml-6 space-y-4 text-gray-300">
            <li
              className={`cursor-pointer ${
                activeItems.soulBoundAsset ? "text-[#21fc0d]" : "text-white"
              }`}
              onClick={() => toggleItem("soulBoundAsset")}
            >
              <div className="flex items-center ml-5 space-x-2">
                {isSoulBoundAssetOpen ? (
                  <MdKeyboardArrowDown className="!w-6 !h-6" />
                ) : (
                  <MdKeyboardArrowRight className=" !w-6 !h-6" />
                )}
                <img
                  src={"/images/Frame-147.png" || "/placeholder.svg"}
                  alt="Vector Image"
                  className="w-6 h-6"
                />
                <span className="text-xl">Soul Bound Asset</span>
              </div>
            </li>
            {isSoulBoundAssetOpen && (
              <ul className="ml-6 space-y-4">
                <li
                  className={`cursor-pointer ${
                    activeItems.images ? "text-[#21fc0d]" : "text-white"
                  }`}
                  onClick={() => toggleItem("images")}
                >
                  <div className="flex items-center ml-5 space-x-2">
                    <MdKeyboardArrowRight className="!w-6 !h-6" />
                    <img
                      src={"/images/Frame-40.png"}
                      alt="Vector Image"
                      className="w-6 h-6"
                    />
                    <span className="text-xl">Images</span>
                  </div>
                </li>
                <li
                  className={`flex items-center space-x-2 cursor-pointer ${
                    activeItems.documents ? "text-[#21fc0d]" : "text-white"
                  }`}
                  onClick={() => toggleItem("documents")}
                >
                  <MdKeyboardArrowRight className=" !w-6 !h-6" />
                  <img
                    src={"/images/Frame-42.png" || "/placeholder.svg"}
                    alt="Vector Image"
                    className="w-6 h-6"
                  />
                  <span className="text-xl">Documents</span>
                </li>
                <li
                  className={`flex items-center space-x-2 cursor-pointer ${
                    activeItems.liveVerification
                      ? "text-[#21fc0d]"
                      : "text-white"
                  }`}
                  onClick={() => toggleItem("liveVerification")}
                >
                  <MdKeyboardArrowRight className=" !w-6 !h-6" />
                  <img
                    src={"/images/Frame-140.png" || "/placeholder.svg"}
                    alt="Vector Image"
                    className="w-6 h-6"
                  />
                  <span className="text-xl">Live Verification</span>
                </li>
              </ul>
            )}
          </ul>
        )}
      </ul>

      <li
        className={`flex items-center space-x-4 cursor-pointer ${
          activeItems.assetPackage ? "text-[#21fc0d]" : ""
        }`}
        onClick={() => toggleItem("assetPackage")}
      >
        <IoIosArrowDropright className="w-7 h-7 text-[#21fc0d]" />
        <img
          src={"/images/Frame-141.png" || "/placeholder.svg"}
          alt="Asset Icon"
          className="w-6 h-6"
        />
        <span className="text-xl">Asset Package</span>
      </li>

      <li
        className={`flex items-center space-x-4 cursor-pointer ${
          activeItems.projectValuation ? "text-[#21fc0d]" : ""
        }`}
        onClick={() => toggleItem("projectValuation")}
      >
        <IoIosArrowDropright className="w-7 h-7 text-[#21fc0d]" />
        <img
          src={"/images/Frame-142.png" || "/placeholder.svg"}
          alt="Asset Icon"
          className="w-6 h-6"
        />
        <span className="text-xl">Project Proposal</span>
      </li>

      <li
        className={`flex items-center space-x-4 cursor-pointer ${
          activeItems.investmentProposal ? "text-[#21fc0d]" : ""
        }`}
        onClick={() => toggleItem("investmentProposal")}
      >
        <IoIosArrowDropright className="w-7 h-7 text-[#21fc0d]" />
        <img
          src={"/images/Frame-143.png" || "/placeholder.svg"}
          alt="Asset Icon"
          className="w-6 h-6"
        />
        <span className="text-xl">Invite Investors</span>
      </li>

      <li
        className={`flex items-center space-x-4 cursor-pointer ${
          activeItems.projectNFTs ? "text-[#21fc0d]" : ""
        }`}
        onClick={() => toggleItem("projectNFTs")}
      >
        <IoIosArrowDropright className="w-7 h-7 text-[#21fc0d]" />
        <img
          src={"/images/Frame-144.png" || "/placeholder.svg"}
          alt="Asset Icon"
          className="w-6 h-6"
        />
        <span className="text-xl">Buy/Sell EARN NFTs</span>
      </li>

      <li
        className={`flex items-center space-x-4 cursor-pointer ${
          activeItems.fractionalOwnership ? "text-[#21fc0d]" : ""
        }`}
        onClick={() => toggleItem("fractionalOwnership")}
      >
        <IoIosArrowDropright className="!w-[34px] !h-[34px] text-[#21fc0d]" />
        <img
          src={"/images/Frame-145.png" || "/placeholder.svg"}
          alt="Asset Icon"
          className="w-6 h-7"
        />
        <span className="text-xl">Investors Actions</span>
      </li>

      {/* <li
        className={`flex items-center space-x-4 cursor-pointer ${
          activeItems.projectOperationsLive ? "text-[#21fc0d]" : ""
        }`}
        onClick={() => toggleItem("projectOperationsLive")}
      >
        <IoIosArrowDropright className="w-7 h-7 text-[#21fc0d]" />
        <img
          src={"/images/Frame-146.png" || "/placeholder.svg"}
          alt="Asset Icon"
          className="w-6 h-6"
        />
        <span className="text-xl">Project Operations Live</span>
      </li> */}
    </div>
  );
};

export default Sidebar;
