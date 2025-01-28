import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUploadModal from "../pages/ImageUploadModal";

const ImagePage = ({ toggleItem, prjId1 }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // State for the preview modal

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://103.204.95.212:4000/api/images/get-image/${prjId1}`
        );
        if (response.data && response.data.data) {
          setUploadedImages(response.data.data);
        } else {
          console.log("No images found for the project.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
    const interval = setInterval(fetchImages, 1000);
    return () => clearInterval(interval);
  }, [prjId1]);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (imageId) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageId)
        ? prevSelected.filter((id) => id !== imageId)
        : [...prevSelected, imageId]
    );
  };

  const handleDelete = async () => {
    if (selectedImages.length === 0) {
      return;
    }
    try {
      for (const id of selectedImages) {
        await axios.delete(
          `http://103.204.95.212:4000/api/images/del-image/${id}`
        );
      }
      setUploadedImages((prev) =>
        prev.filter((image) => !selectedImages.includes(image.id))
      );
      setSelectedImages([]);
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  const handleImageClick = (image) => {
    setPreviewImage(image);
  };

  const closePreviewModal = () => {
    setPreviewImage(null);
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
          src={"/images/Frame-40.png" || "/placeholder.svg"}
          alt="Dropdown Icon"
          className="w-6 h-6 ml-4"
        />
        <span className="mb-1 ml-3 text-lg font-semibold cursor-pointer">
          Image
        </span>
        <div className="flex items-center gap-4 ml-auto text-lg">
          <img
            src="/icons/upload-2.png"
            alt="Upload"
            className="w-6 h-6 cursor-pointer"
            onClick={handleUploadClick}
          />
          <img
            src="/icons/delete.png"
            alt="Delete"
            className="w-6 h-6 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
      <div
        className={`grid grid-cols-4 gap-4 mt-4 h-[500px] ${
          uploadedImages.length > 8 ? "overflow-y-scroll" : "overflow-hidden"
        } scrollbar-thin scrollbar-thumb-electric-green scrollbar-track-gray-700`}
      >
        {uploadedImages.map((image) => (
          <div
            key={image.id}
            className="relative p-2 text-white bg-gray-800 rounded-md shadow-md h-[240px]"
          >
            <input
              type="checkbox"
              className="absolute left-3 top-3 w-5 h-5 cursor-pointer bg-[#FFFFFF] border-[#000000]"
              onChange={() => handleCheckboxChange(image.id)}
              checked={selectedImages.includes(image.id)}
            />
            <img
              src={`http://103.204.95.212:4000/${image.filePath}`}
              alt={`Uploaded ${image.id}`}
              onClick={() => handleImageClick(image)}
              className="object-cover w-full h-32 mb-2 rounded-md cursor-pointer"
            />
            <p className="gap-4 text-xs">
              <strong>Description:</strong> {image.description || "N/A"}
            </p>
            <p className="gap-4 text-xs">
              <strong>Created At:</strong>{" "}
              {new Date(image.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <ImageUploadModal
        onClose={closeModal}
        visible={isModalOpen}
        disprjId={prjId1}
        onImageUpload={(newImage) => {
          setUploadedImages((prev) => [...prev, newImage]);
        }}
      />
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-lg p-4 bg-white rounded-lg">
            <button
              className="absolute text-gray-500 top-2 right-2 hover:text-black"
              onClick={closePreviewModal}
            >
              &times;
            </button>
            <img
              src={`http://103.204.95.212:4000/${previewImage.filePath}`}
              alt="Preview"
              className="w-full h-auto rounded-md"
            />
            <p className="mt-2 text-center">
              {previewImage.description || "No description available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePage;
