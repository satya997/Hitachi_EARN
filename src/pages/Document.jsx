import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentUploadModal from "./DocumentUploadModal";

const Document = ({ prjId1 }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    // Add your delete functionality here
    console.log("Delete clicked");
  };

  return (
    <div className="w-[1000px]">
      <div className="flex items-center mt-9 text-white/90">
        <img
          src={"/images/Frame-148.png" || "/placeholder.svg"}
          alt="Dropdown Icon"
          className="w-6 h-6"
        />
        <span
          onClick={() => navigate("/oilfield_asset_marketplace")}
          className="ml-2 text-lg font-semibold cursor-pointer"
        >
          Project Information
        </span>
        <span className="ml-4 text-lg">&gt;</span>
        <img
          src={"/images/Frame-147.png" || "/placeholder.svg"}
          alt="Dropdown Icon"
          className="w-6 h-6 ml-4"
        />
        <span className="ml-2 text-lg font-semibold cursor-pointer">
          Soul Bound Asset
        </span>
        <span className="ml-4 text-lg">&gt;</span>
        <img
          src={"/images/Frame-42.png" || "/placeholder.svg"}
          alt="Dropdown Icon"
          className="w-6 h-6 ml-4"
        />
        <span className=" ml-2 text-lg font-semibold  cursor-pointer">
          Documents
        </span>
        <div className="flex items-center gap-4 ml-auto text-lg">
          {/* Upload Icon */}
          <img
            src="/icons/upload-2.png"
            alt="Upload"
            className="w-6 h-6 cursor-pointer"
            onClick={handleUploadClick}
          />
          {/* Delete Icon */}
          <img
            src="/icons/delete.png"
            alt="Delete"
            className="w-6 h-6 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>

      <DocumentUploadModal
        onClose={closeModal}
        visible={isModalOpen}
        disprjId={prjId1}
      />
    </div>
  );
};

export default Document;
