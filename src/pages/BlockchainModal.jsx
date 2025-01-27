import React, { useEffect, useState } from "react";
import axios from "axios";

const BlockchainModal = ({ onClose, prj_id }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("blockchain", prj_id);

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
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 top-[13em]">
      <div className="w-full max-w-md bg-[#4A4A4A] text-white rounded-lg shadow-xl">
        <div className="p-4 flex items-center justify-between border-b border-gray-600">
          <h2 className="text-2xl font-normal">Project Modification</h2>
          <button
            className="text-[#33FF00] hover:text-[#2be600] transition-colors"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        <div className="bg-white rounded-b-lg overflow-hidden">
          <div className="h-[400px] overflow-y-auto p-4 space-y-6">
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading &&
              !error &&
              entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border"
                >
                  {/* Circle for Index */}
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-lg font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Data Display */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">
                      <span className="text-sm font-semibold text-gray-500">
                        Project Hash:
                      </span>{" "}
                      <span className="break-all">{entry.prj_hash}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
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
                    <a
                      href="#"
                      className="text-blue-500 text-sm underline mt-2 inline-block"
                      onClick={(e) => e.preventDefault()}
                    >
                      hadera link
                    </a>
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
