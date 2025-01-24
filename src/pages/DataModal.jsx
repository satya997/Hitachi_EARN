import React from "react";

const DataModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative text-gray-800 bg-white rounded-lg shadow-lg w-[40em] h-[20em] ml-10">
        {/* Close Button */}
        {/* <button
          className="absolute p-2 font-bold text-gray-800 top-4 right-4 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button> */}
        <button
              className="absolute text-5xl text-[#fc0d21] right-3 mb-3 "
              onClick={onClose}
            >
              &times;
            </button>
        

        {/* Modal Title */}
        <h2 className="py-4 text-xl font-semibold text-center border-b">
          Show Data
        </h2>

        {/* Table Layout */}
        <div className="p-4">
          <div className="grid grid-cols-2 pb-2 font-semibold text-gray-700 border-b">
            <div>Index</div>
            <div>Timestamp</div>
          </div>
          <div className="divide-y">
            {data.map((item, index) => (
              <div className="grid grid-cols-2 py-2" key={index}>
                <div>{index + 1}</div>
                <div>{item.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataModal;
