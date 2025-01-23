import React from "react";
import Sidebar from "../components/Sidebar";
// import Mainheader from "../components/Mainheader";
// import { MdDeleteForever, MdOutlineFileUpload } from "react-icons/md";

const ImagePage = (Sidebar) => {
  return (
    <div className="w-[1000px]">
      <div className="flex items-center mt-9 text-white/90">
        <img
          src={"/images/Frame-148.png" || "/placeholder.svg"}
          alt="Dropdown Icon"
          className="w-6 h-6 "
        />

        <strong>
          <span
            onClick={() => toggleItem("/oilfield_asset_marketplace")}
            className="ml-2 text-lg cursor-pointer"
          >
            Project Information
          </span>
        </strong>
        {/* <span className="text-lg">Project Information</span> */}
        <span className="ml-4 text-lg ">&gt;</span>
        <img
          src={"/images/Frame-147.png" || "/placeholder.svg"}
          alt="Dropdown Icon"
          className="h-6 w-6 !ml-4"
        />

        <span className="ml-2 text-lg font-semibold cursor-pointer">Soul Bound Asset</span>

        <span className="ml-4 text-lg ">&gt;</span>

        <img
          src={"/images/Frame-40.png" || "/placeholder.svg"}
          alt="Dropdown Icon"
          className="h-6 w-6 !ml-4"
        />
        <span className="ml-3 text-lg underline cursor-pointer">Images</span>

        {/* Action Icons */}
        <div className="flex items-center gap-4 ml-[21em] text-lg">
          {/* Upload Icon */}
          <img
            src="/icons/upload-2.png" // Replace with the correct path to your upload icon image
            alt="Upload"
            className="w-6 h-6"
          />

          {/* Delete Icon */}
          <img
            src="/icons/delete.png" // Replace with the correct path to your delete icon image
            alt="Delete"
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
