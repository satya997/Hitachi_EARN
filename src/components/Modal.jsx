import React, { useState, useEffect } from "react";
import axios from "axios";
import { data, useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Mainheader from "../components/Mainheader";
import ImagePage from "../pages/ImagePage";
const Modal = ({ onClose, prj_id, upatateclick }) => {
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
  const [searchParams] = useSearchParams();

  const urlItem = searchParams.get("prj");

  console.log(searchParams.get("prj"), "Sss");

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

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#000000] text-white h-[785px] shadow-lg w-[1460px]  relative mb-5 mt-12  ">
        <div className="flex items-center justify-between pb-4 border-2 border-gray-600 ">
          <h2 className="text-[1.5rem] font-semibold ml-4 mt-1 ">
            Well PSH Project ID : PRJ0001
          </h2>
          <button
            className="mt-1 mr-3 text-2xl text-red-600 "
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="flex ">
          <Sidebar />
          <div className="bg-[#171F31] p-6 h-[726px]">
            <Mainheader />

            {urlItem === "prj-images" ? (
              <ImagePage/>
            ) : (
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
                    <span className="ml-2 text-lg font-semibold">
                      Project Details
                    </span>
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
                      <div className="text-sm text-white/60">
                        Asset Id: 0001
                      </div>
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
                  {!prj_id && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="submit-button"
                    >
                      Cancel
                    </button>
                  )}

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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
