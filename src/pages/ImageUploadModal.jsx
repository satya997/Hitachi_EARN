import React, { useState, useEffect } from "react";

const ImageUploadModal = ({ visible, onClose, onImageUpload }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (visible) {
      setUploadedImage(null); // Reset the uploaded image when the modal is opened
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files ? event.target.files[0] : event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setUploadedImage(imageData); // Update local state
        onImageUpload(imageData); // Update parent state
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    document.getElementById("file-input").click();
  };

  const handleUploadClick = () => {
    if (uploadedImage) {
      onClose(); // Close the modal
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleImageUpload(e);
  };

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 ">
        <div className="relative bg-white shadow-lg w-[686px] h-[455px] border-1 border-[#D9D9D9]">
          {/* Header */}
          <div className="relative flex items-center justify-center text-[#171f31] text-lg bg-[#F4F4F4] w-full h-[50px]">
            {/* Centered Text */}
            <h2 className="text-lg font-semibold">Add Image Here</h2>

            {/* Close Icon */}
            <button
              className="absolute text-5xl text-[#21FC0D] right-3 mb-3 "
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          {/* Upload Section */}
          <div className="mt-4">
            <div
              className="flex flex-col items-center justify-center text-center bg-white border border-gray-300 rounded-md w-[569px] h-[100px] mt-9 ml-14 space-y-2 cursor-pointer"
              onClick={triggerFileUpload}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="object-cover h-[100px] rounded-sm w-[100px]"
                />
              ) : (
                <>
                  <img
                    src="/icons/upload-2.png"
                    alt="Upload"
                    className="w-6 h-6"
                  />
                  <p className="mt-2 text-black">Add image here</p>
                  <p className="text-xs text-gray-500">
                    Drag and drop your image here
                  </p>
                </>
              )}
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Description Section */}
          <div className="mt-6 space-y-5 mr-14 ml-14 h-[150px]">
            <label
              htmlFor="description"
              className="block font-semibold text-black text-md"
            >
              Write description
            </label>
            <textarea
              id="description"
              placeholder="Lorem Ipsum"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 h-[100px] bg-white text-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 space-x-4 mr-14">
            <button
              className="px-3 py-1 text-[#21FC0D] bg-[#4A4A4A] rounded-md  w-[132px] h-[44px] border-1 border-[#21FC0D]  font-bold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-[#21FC0D] rounded-md bg-[#4A4A4A] w-[132px] h-[44px] font-bold"
              onClick={handleUploadClick} // Close modal on upload
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadModal;
