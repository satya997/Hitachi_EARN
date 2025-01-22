import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { data } from "react-router-dom";

const Modal = ({ onClose, prj_id, upatateclick }) => {
  const [activeItems, setActiveItems] = useState({
    projectInformation: false,
    soulBoundAsset: false,
    images: false,
    oilfieldImage1: false,
    oilfieldImage2: false,
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

      // Special handling for Project Information and its children
      if (item === "projectInformation") {
        setIsProjectInfoOpen(!isProjectInfoOpen);
        setCurrentImage(
          !isProjectInfoOpen ? "/images/group-2.png" : "/images/group-1.png"
        );
      } else if (
        item === "soulBoundAsset" ||
        item === "images" ||
        item === "oilfieldImage1" ||
        item === "oilfieldImage2" ||
        item === "documents" ||
        item === "liveVerification"
      ) {
        newState.projectInformation = true;
        if (item === "soulBoundAsset") {
          setIsSoulBoundAssetOpen(!isSoulBoundAssetOpen);
          // setSoulBoundAssetImage(
          //   isSoulBoundAssetOpen ? "/images/Vector.png" : "/images/Vector-2.png"
          // );
        } else {
          newState.soulBoundAsset = true;
        }
        if (
          item === "images" ||
          item === "oilfieldImage1" ||
          item === "oilfieldImage2"
        ) {
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

  const [formData, setFormData] = useState({
    projectName: "",
    projectId: "",
    startDate: "",
    endDate: "",
    managementCompany: "",
    nftSupply: "",
    description: "",
    address: "",
    landmark: "",
    latitude: "",
    longitude: "",
    assetDescription: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(
          `http://103.204.95.212:4000/api/projects/${prj_id}`
        );
        if (response.status === 200) {
          const projectData = response.data.project;

          console.log("form data is ", projectData);

          setFormData({
            projectName: projectData.prj_name || "",
            projectId: projectData.prj_id || "",
            startDate: projectData.prj_start_date || "",
            endDate: projectData.prj_end_date || "",
            managementCompany: projectData.prj_company || "",
            nftSupply: projectData.prj_nft_id || "",
            description: projectData.prj_description || "",
            address: projectData.prj_sba_address || "",
            landmark: projectData.prj_sba_landmark || "",
            latitude: projectData.prj_sba_lat || "",
            longitude: projectData.prj_sba_long || "",
            assetDescription: projectData.prj_sba_details || "",
          });
        } else {
          setError("Failed to fetch project data");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("Failed to fetch project data");
      }
    };

    fetchProjectData();
  }, [prj_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, isUpdating) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      prj_name: formData.projectName,
      prj_id: formData.projectId,
      prj_start_date: formData.startDate,
      prj_end_date: formData.endDate,
      prj_company: formData.managementCompany,
      prj_nft_id: formData.nftSupply,
      prj_description: formData.description,
      prj_sba_address: formData.address,
      prj_sba_landmark: formData.landmark,
      prj_sba_lat: formData.latitude,
      prj_sba_long: formData.longitude,
      prj_sba_details: formData.assetDescription,
      prj_status: formData.status,
    };

    try {
      const response = isUpdating
        ? await axios.put(
            `http://103.204.95.212:4000/api/projects/updateProject/${formData.projectId}`,
            payload
          )
        : await axios.post(
            `http://103.204.95.212:4000/api/projects/create-project`,
            payload
          );

      if (response.status === 200) {
        setSuccess(
          isUpdating
            ? "Project updated successfully!"
            : "Project created successfully!"
        );
        upatateclick(); // Call the update function passed as prop

        // Reset form data after successful submission
        setFormData({
          projectName: "",
          projectId: "",
          startDate: "",
          endDate: "",
          managementCompany: "",
          nftSupply: "",
          description: "",
          address: "",
          landmark: "",
          latitude: "",
          longitude: "",
          assetDescription: "",
        });
      } else {
        setError(`Error: ${response.statusText}`);
      }
    } catch (err) {
      console.error(
        "API Error:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      projectName: "",
      projectId: "",
      startDate: "",
      endDate: "",
      managementCompany: "",
      nftSupply: "",
      description: "",
      address: "",
      landmark: "",
      latitude: "",
      longitude: "",
      assetDescription: "",
    });
  };

  const steps = [
    {
      label: "Project\nInformation",
      icon: () => (
        <img
          src={"/images/Group-15.png" || "/placeholder.svg"}
          alt="Project Info"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "Asset\nPackage",
      icon: () => (
        <img
          src={"/images/Group-16.png" || "/placeholder.svg"}
          alt="Asset Package"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "Project\nProposal",
      icon: () => (
        <img
          src={"/images/Group-17.png" || "/placeholder.svg"}
          alt="Project Proposal"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "Invite\nInvestors",
      icon: () => (
        <img
          src={"/images/Group-18.png" || "/placeholder.svg"}
          alt="Invite Investors"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "EARN\nNFTs",
      icon: () => (
        <img
          src={"/images/Group-19.png" || "/placeholder.svg"}
          alt="EARN NFTs"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "Investor\nActions",
      icon: () => (
        <img
          src={"/images/Group-20.png" || "/placeholder.svg"}
          alt="Investor Actions"
          className="w-10 h-10"
        />
      ),
    },
    {
      label: "Project\nOpr Live",
      icon: () => (
        <img
          src={"/images/Group-21.png" || "/placeholder.svg"}
          alt="Project Opr Live"
          className="w-10 h-10"
        />
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (index) => {
    setCurrentStep(index + 1);
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#000000] text-white h-[785px] shadow-lg w-[1460px]  relative mb-5 mt-12  ">
        <div className="flex items-center justify-between pb-4 border-2 border-gray-600 ">
          <h2 className="text-[1.5rem] font-semibold ml-4 mt-1 ">
            Well PSH Project ID : PRJ0001
          </h2>
          <button className="mt-1 mr-3 text-2xl " onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="flex ">
          <div className="w-1/2 bg-[#4a4a4a] p-4 h-[726px]  space-y-7">
            <ul className="space-y-4 text-sm">
              {/* projectInformation */}
              <li
                className={`cursor-pointer ${
                  activeItems.projectInformation
                    ? "text-[#21fc0d]"
                    : "text-white"
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
                      activeItems.soulBoundAsset
                        ? "text-[#21fc0d]"
                        : "text-white"
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
                          {isImagesOpen ? (
                            <MdKeyboardArrowDown className="!w-6 !h-6" />
                          ) : (
                            <MdKeyboardArrowRight className=" !w-6 !h-6" />
                          )}
                          <img
                            src={"/images/Frame-40.png" || "/placeholder.svg"}
                            alt="Vector Image"
                            className="w-6 h-6"
                          />
                          <span className="text-xl ">Images</span>
                        </div>
                      </li>

                      <li
                        className={`flex items-center space-x-2 cursor-pointer ${
                          activeItems.documents
                            ? "text-[#21fc0d]"
                            : "text-white"
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
              <span className="text-xl">Project Valuation</span>
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
              <span className="text-xl">Investment Proposal</span>
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
              <span className="text-xl">Project NFTs</span>
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
              <span className="text-xl">Fractional Ownership Buy/Sell</span>
            </li>

            <li
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
            </li>
          </div>

          <div className="bg-[#171F31] p-6 h-[726px]">
            <div className="w-full p-3 bg-[#4a4a4a] rounded-sm">
              <div className="relative max-w-[900px] mx-auto">
                <div className="relative flex items-center justify-between">
                  <div className="absolute top-5 left-12 w-[90%] h-[3px] bg-white/20" />
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={index}
                        className="relative z-10 flex flex-col items-center cursor-pointer"
                        onClick={() => handleStepClick(index)}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors border-2
                            ${
                              index === currentStep - 1
                                ? "bg-gray-800 "
                                : "bg-gray-600 border-gray-400"
                            }`}
                        >
                          <Icon />
                        </div>
                        <p
                          className={`text-center text-sm whitespace-pre-line max-w-[80px]
                            ${
                              index === currentStep - 1
                                ? "text-[#21fc0d]"
                                : "text-gray-300"
                            }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-1 mx-auto w-[1000px]"
            >
              <div className="flex items-center mt-6 text-white/90">
                <img
                  src={"/images/Frame-148.png" || "/placeholder.svg"}
                  alt="Dropdown Icon"
                  className="w-6 h-6 "
                />

                <strong>
                  <span className="ml-2 text-lg ">Project Information</span>
                </strong>
                {/* <span className="text-lg">Project Information</span> */}
                <span className="ml-4 text-lg ">&gt;</span>
                <img
                  src={"/images/Frame-148.png" || "/placeholder.svg"}
                  alt="Dropdown Icon"
                  className="h-6 w-6 !ml-4"
                />
                <u>
                  <span className="ml-2 text-lg font-semibold">Project Details</span>
                </u>
                <span className="flex-grow"></span>
                <a href="#" className="mr-4 text-lg underline">
                  Project Trail (Blockchain)
                </a>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="projectName"
                        className="block w-32 text-white/90"
                      >
                        Project Name:
                      </label>
                      <input
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        required
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="projectId"
                        className="block w-32 text-white/90"
                      >
                        Project ID:
                      </label>
                      <input
                        id="projectId"
                        name="projectId"
                        value={formData.projectId}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="startDate"
                        className="block w-32 text-white/90"
                      >
                        Start Date:
                      </label>
                      <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate.split("T")[0]}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="endDate"
                        className="block w-32 text-white/90"
                      >
                        End Date:
                      </label>
                      <input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate.split("T")[0]}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="managementCompany"
                        className="block w-32 text-white/90"
                      >
                        Management Company:
                      </label>
                      <input
                        id="managementCompany"
                        name="managementCompany"
                        value={formData.managementCompany}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="nftSupply"
                        className="block w-32 text-white/90"
                      >
                        NFT Token Supply(s):
                      </label>
                      <input
                        id="nftSupply"
                        name="nftSupply"
                        type="number"
                        value={formData.nftSupply}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-start space-x-4">
                      <label
                        htmlFor="description"
                        className="block w-32 pt-2 text-white/90"
                      >
                        Description:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90 min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border-b border-[#2a3442] p-4">
                    <h2 className="text-lg font-semibold text-white/90">
                      Soul Bound Asset Properties:
                    </h2>
                    <div className="text-sm text-white/60">Asset Id: 0001</div>
                  </div>

                  <div className="p-3 space-y-2 border border-[#21fc0d] rounded-lg">
                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="address"
                        className="block w-32 text-white/90"
                      >
                        Address:
                      </label>
                      <input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="landmark"
                        className="block w-32 text-white/90"
                      >
                        Landmark:
                      </label>
                      <input
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="latitude"
                        className="block w-32 text-white/90"
                      >
                        Latitude:
                      </label>
                      <input
                        id="latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="longitude"
                        className="block w-32 text-white/90"
                      >
                        Longitude:
                      </label>
                      <input
                        id="longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90"
                      />
                    </div>

                    <div className="flex items-start space-x-4">
                      <label
                        htmlFor="assetDescription"
                        className="block w-32 pt-2 text-white/90"
                      >
                        Description:
                      </label>
                      <textarea
                        id="assetDescription"
                        name="assetDescription"
                        value={formData.assetDescription}
                        onChange={handleInputChange}
                        className="flex-1 bg-[#4A4A4A] border border-[#ffffff] rounded p-2 text-white/90 min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="submit-button"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {prj_id ? "Update" : "Save"}
                </button>
                {!prj_id && (
                  <button type="button" className="submit-button">
                    Save & Next
                  </button>
                )}
              </div> */}
              <div className="flex justify-end space-x-2">

            { !prj_id && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="submit-button"
                >
                  Cancel
                </button>
                )
              }
                
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e, !!prj_id)} // Pass whether it's an update
                  className="submit-button"
                >
                  {prj_id ? "Edit & Update" : "Save"}
                </button>
                
                {!prj_id && (
                  <button
                    type="button"
                    onClick={(e) => handleSaveAndNext(e)} // Handle Save & Next separately
                    className="submit-button"
                  >
                    Save & Next
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
