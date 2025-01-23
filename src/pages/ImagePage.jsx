import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import ImageUploadModal from "../pages/ImageUploadModal"; // Import your modal component
const ImagePage = (toggleItem) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [uploadedImage, setUploadedImage] = useState(null); // State to hold uploaded image

  const handleUploadClick = () => {
    setIsModalOpen(true); // Open the modal
  };
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <div className="w-[1000px]">
        <div className="flex items-center mt-9 text-white/90">
          <img
            src={"/images/Frame-148.png" || "/placeholder.svg"}
            alt="Dropdown Icon"
            className="w-6 h-6 "
          />
          <span
            onClick={() => navigate("/oilfield_asset_marketplace")}
            className="ml-2 text-lg font-semibold cursor-pointer"
          >
            Project Information
          </span>
          <span className="ml-4 text-lg ">&gt;</span>
          <img
            src={"/images/Frame-147.png" || "/placeholder.svg"}
            alt="Dropdown Icon"
            className="h-6 w-6 !ml-4"
          />
          <span className="ml-2 text-lg font-semibold cursor-pointer">
            Soul Bound Asset
          </span>
          <span className="ml-4 text-lg ">&gt;</span>
          <img
            src={"/images/Frame-40.png" || "/placeholder.svg"}
            alt="Dropdown Icon"
            className="h-6 w-6 !ml-4"
          />
          <span className="mb-1 ml-3 text-lg font-semibold underline cursor-pointer">
            Image
          </span>
          <div className="flex items-center gap-4 ml-[21em] text-lg">
            {/* Upload Icon */}
            <img
              src="/icons/upload-2.png"
              alt="Upload"
              className="w-6 h-6 cursor-pointer"
              onClick={handleUploadClick} // Add click handler
            />
            {/* Delete Icon */}
            <img
              src="/icons/delete.png"
              alt="Delete"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>

        {/* Display Uploaded Image */}
        {uploadedImage && (
          <div className="mt-4">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="object-cover w-[200px] h-[200px] rounded-md"
            />
          </div>
        )}

        {/* Modal */}
        <ImageUploadModal
          onClose={closeModal}
          visible={isModalOpen}
          onImageUpload={setUploadedImage} // Pass the state updater
        />
      </div>
    </>
  );
};
export default ImagePage;