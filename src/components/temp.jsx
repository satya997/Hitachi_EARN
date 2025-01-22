import React, { useState } from "react";
import axios from "axios";
const Modal = ({ onClose,prj_id,upatateclick}) => {

  console.log(prj_id,"prj of the card is ")
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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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
    };

    try {
      const response = await axios.post(
        "http://103.204.95.212:4000/api/projects/create-project",
        payload
      );

      if (response.status === 200) {
        setSuccess("Form submitted successfully!");
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
      <div className="bg-[#101828] text-white h-[820px] shadow-lg w-[1470px] p-8 relative border-[2px] border-black mb-5">
        <div className="flex items-center justify-between pb-4 border-b border-gray-600">
          <h2 className="text-lg font-semibold">
            Well PSH Project ID : PRJ0001
          </h2>
          <button
            className="text-2xl text-gray-400 hover:text-white"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="flex mt-6 space-x-6">
          <div className="w-1/2 bg-[#4a4a4a] p-4 h-[700px] rounded-lg space-y-7">
         

            <form
              onSubmit={handleSubmit}
              className="space-y-1 mx-auto w-[1000px]"
            >
              <div className="flex items-center mt-6 space-x-2 text-white/90">
                <span className="text-lg">Project Information</span>
                <span className="text-lg">&gt;</span>
                <span className="text-lg font-semibold">Project Details</span>
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
                        value={formData.startDate}
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
                        value={formData.endDate}
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

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="submit-button"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Save
                </button>
                <button type="button" className="submit-button">
                  Save & Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
