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
  console.log("ImagePage Project ID:", prjId1);

  // Fetch images from the API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://103.204.95.212:4000/api/images/get-image/${prjId1}`
        );
        if (response.data && response.data.data) {
          setUploadedImages(response.data.data); // Assuming response.data.data contains the images
        } else {
          console.log("No images found for the project.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [prjId1]);
  // Open upload modal
  const handleUploadClick = () => {
    setIsModalOpen(true);
  };
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Handle checkbox selection
  const handleCheckboxChange = (imageId) => {
    setSelectedImages(
      (prevSelected) =>
        prevSelected.includes(imageId)
          ? prevSelected.filter((id) => id !== imageId) // Remove if already selected
          : [...prevSelected, imageId] // Add if not selected
    );
  };
  // Delete selected images
  const handleDelete = async () => {
    if (selectedImages.length === 0) {
      // alert("No images selected for deletion.");
      return;
    }
    try {
      // Delete images one by one
      for (const id of selectedImages) {
        await axios.delete(
          `http://103.204.95.212:4000/api/images/del-image/${id}`
        );
      }
      // Update the uploaded images list after deletion
      setUploadedImages((prev) =>
        prev.filter((image) => !selectedImages.includes(image.id))
      );
      setSelectedImages([]); // Clear the selection
      // alert("Selected images have been deleted successfully.");
    } catch (error) {
      console.error("Error deleting images:", error);
      // alert("Failed to delete selected images. Please try again.");
    }
  };
  return (
    <div className="w-[1000px]">
      {/* Breadcrumb Navigation */}
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
        <span className="mb-1 ml-3 text-lg font-semibold underline cursor-pointer">
          Image
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
      {/* Display Uploaded Images as Cards with Scrollbar */}
      
      <div className="grid grid-cols-4 gap-4 mt-4 max-h-[300px] overflow-y-auto">
  {uploadedImages.map((image) => (
    <div
      key={image.id}
      className="relative p-2 text-white bg-gray-800 rounded-md shadow-md"
    >
      {/* Checkbox positioned in the top-left */}
      <input
        type="checkbox"
        className="absolute top-2 left-2"
        onChange={() => handleCheckboxChange(image.id)} // Pass the correct image ID
        checked={selectedImages.includes(image.id)} // Check if the image is selected
      />

      {/* Image */}
      <img
        src={`http://103.204.95.212:4000/${image.filePath}`} // Use filePath for the image source
        alt={`Uploaded ${image.id}`}
        className="object-cover w-full h-32 mb-2 rounded-md" // Adjusted height
      />

      {/* Information */}
      <p className="text-xs">
        <strong>ID:</strong> {image.id}
      </p>
      <p className="text-xs">
        <strong>Description:</strong> {image.description || "N/A"}
      </p>
      <p className="text-xs">
        <strong>Project ID:</strong> {image.prj_id}
      </p>
      <p className="text-xs">
        <strong>Created At:</strong>{" "}
        {new Date(image.createdAt).toLocaleString()}
      </p>
      <p className="text-xs">
        <strong>Updated At:</strong>{" "}
        {new Date(image.updatedAt).toLocaleString()}
      </p>
    </div>
  ))}
</div>

      {/* Image Upload Modal */}
      <ImageUploadModal
        onClose={closeModal}
        visible={isModalOpen}
        disprjId={prjId1}
        onImageUpload={(newImage) => {
          setUploadedImages((prev) => [...prev, newImage]); // Append the new image
        }}
      />
    </div>
  );
};
export default ImagePage;