import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DocumentUploadModal from "./DocumentUploadModal";

const Document = ({ prjId1 }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        `http://103.204.95.212:4000/api/documents/get-documents/${prjId1}`
      );
      setDocuments(response.data.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [prjId1]); // Fetch data whenever the component mounts or prjId1 changes

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchDocuments(); // Refresh documents after closing the modal
  };

  const handleDeleteSelected = async () => {
    try {
      for (const documentId of selectedDocuments) {
        await axios.delete(
          `http://103.204.95.212:4000/api/documents/del-document/${documentId}`
        );
      }
      setSelectedDocuments([]);
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting documents:", error);
    }
  };

  const toggleDocumentSelection = (documentId) => {
    setSelectedDocuments((prevSelected) => {
      if (prevSelected.includes(documentId)) {
        return prevSelected.filter((id) => id !== documentId);
      } else {
        return [...prevSelected, documentId];
      }
    });
  };

  const getFileTypeIcon = (filePath) => {
    if (filePath.endsWith(".pdf")) {
      return "/icons/document.png"; // Replace with the actual PDF icon path
    }
    return "/icons/document.png"; // Replace with a default icon path
  };

  const openDocumentInNewTab = (filePath) => {
    const fullPath = `http://103.204.95.212:4000/${filePath}`;
    window.open(fullPath, "_blank");
  };

  return (
    <div className="w-[1000px] mx-auto py-6">
      <div className="flex items-center mb-6 text-white/90">
        <img
          src="/images/Frame-148.png"
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
          src="/images/Frame-147.png"
          alt="Dropdown Icon"
          className="w-6 h-6 ml-4"
        />
        <span className="ml-2 text-lg font-semibold cursor-pointer">
          Soul Bound Asset
        </span>
        <span className="ml-4 text-lg">&gt;</span>
        <img
          src="/images/Frame-42.png"
          alt="Dropdown Icon"
          className="w-6 h-6 ml-4"
        />
        <span className="ml-2 text-lg font-semibold cursor-pointer ">
          Documents
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
            onClick={handleDeleteSelected}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-md w-[300px] h-[150px] "
              // onClick={() => openDocumentInNewTab(doc.filePath)}
            >
              <div className="flex items-center mb-8">
                <input
                  type="checkbox"
                  className="fixed mb-[5em]"
                  checked={selectedDocuments.includes(doc.id)}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent checkbox click from triggering the document preview
                    toggleDocumentSelection(doc.id);
                  }}
                />
                <img
                  src={getFileTypeIcon(doc.filePath)}
                  alt="File Icon"
                  onClick={() => openDocumentInNewTab(doc.filePath)}
                  className="w-8 h-8 mr-4 cursor-pointer"
                />
                <div>
                  <p className="text-sm font-semibold text-[#595959]">
                    {"Certificate.pdf"}
                  </p>
                  <p className="text-sm font-semibold text-[#595959]">
                    {doc.description}
                  </p>
                  <p className="text-xs text-[#000000]">
                    Uploaded on {new Date(doc.createdAt).toLocaleDateString()}{" "}
                    at {new Date(doc.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No documents available.</p>
        )}
      </div>

      {isModalOpen && (
        <DocumentUploadModal
          prjId={prjId1}
          onClose={closeModal}
          visible={isModalOpen}
        />
      )}
    </div>
  );
};

export default Document;
