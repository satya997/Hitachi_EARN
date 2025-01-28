import React, { useEffect, useState } from "react";
import axios from "axios";
const BlockchainModal = ({ onClose, prj_id }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(
          `http://103.204.95.212:4000/api/projects/trails/${prj_id}`
        );
        setEntries(response.data.trails);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load project details.");
        setLoading(false);
      }
    };
    fetchEntries();
  }, [prj_id]);
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40">
      <div className="w-[820px] bg-[#777777] text-white rounded-lg shadow-xl mt-[220px] ">
        <div className="relative flex items-center justify-center h-[60px] rounded-t-lg">
          <h2 className="text-[28px] font-medium">Project Trail(Blockchain)</h2>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#21FC0D] hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="bg-white rounded-b-lg">
          <div
            className="h-[400px] overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#21FC0D #D9D9D9",
            }}
          >
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading &&
              !error &&
              entries.map((entry, index) => (
                <div key={entry.id} className="relative">
                  <div className="flex items-start gap-4">
                    {/* Circle for Index */}
                    <div className="flex items-center justify-center w-12 h-12 text-lg font-medium bg-[#D9D9D9] rounded-full text-black">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    {/* Data Display */}
                    <div className="flex-1 ml-2 space-y-2">
                      <p className="text-lg text-[#4A4A4A]">
                        {new Date(entry.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}{" "}
                        at{" "}
                        {new Date(entry.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-[#4A4A4A] leading-relaxed">
                        <span className="text-lg font-medium">
                          "project_hash":
                        </span>{" "}
                        <span className="break-all">"{entry.prj_hash}",</span>
                      </p>
                      <div className="relative">
                        <a
                          href={`https://hashscan.io/testnet/transaction/${entry.transaction_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block  hover:opacity-80 transition-opacity text-[#008AE6]  hover:text-blue-600 ml-1 font-medium "
                        >
                          https://hashscan.io/testnet/transaction/
                          {entry.transaction_id}
                        </a>
                        <div className="absolute -bottom-3 left-0 w-[671px] h-[1px] bg-[#A6A6A6]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlockchainModal;
