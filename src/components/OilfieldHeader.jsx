import React, { useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
// import drop from "../assets/Images1/Drop Down.png";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const OilfieldHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);

  const [newProject, setNewProject] = useState([]);
  const [newMint, setNewMint] = useState([]);
  const [newBuy, setNewBuy] = useState([]);

  const catMenu = useRef(null);
  const catMenu2 = useRef(null);
  const catMenu3 = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const Internal_show = (key) => {
    console.log("Selected:", key);
  };

  const openTab = () => setOption1((prev) => !prev);
  const openTab2 = () => setOption2((prev) => !prev);
  const openTab3 = () => setOption3((prev) => !prev);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    // naviagte("/oilfield_asset_marketplace?prj=prj-info");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // naviagte("/oilfield_asset_marketplace");
    // Remove the query string
    console.log("Close Modal");
    navigate("/oilfield_asset_marketplace", { replace: true });
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between mt-[48px] w-full h-[10%] px-2 py-2 bg-gray-800">
      <div className="flex items-center justify-around w-[74%] gap-x-[12px]">
        {/* Search Bar */}
        <div className="flex items-center w-[60%] flex-1 px-4 py-2 bg-gray-700 rounded-md h-12">
          <CiSearch className="mr-2 text-xl text-white" />
          <input
            type="text"
            placeholder="Regions, State, City"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full text-white placeholder-white bg-transparent focus:outline-none"
          />
        </div>

        {/* New Project */}
        <div
          className="relative w-[15%] h-12 flex justify-between 
   text-white bg-gray-700 rounded-md pr-0 pl-2"
        >
          <button
            onClick={openTab}
            className="h-12 text-white bg-gray-700 rounded-md "
          >
            <span>New Project</span>
          </button>
          <img
            src={"/images/Drop-Down.png"}
            alt="dropdown"
            className="w-12 h-12 transition-transform duration-200 transform hover:scale-105"
          />
          {option1 && (
            <div
              ref={catMenu}
              className="absolute left-0 w-full mt-2 bg-gray-700 rounded-md shadow-lg"
            >
              {newProject.map((key) => (
                <p
                  key={key}
                  className="px-4 py-2 text-white cursor-pointer hover:bg-gray-600"
                  onClick={() => {
                    Internal_show(key);
                    setOption1(false);
                  }}
                >
                  {key}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Newly Minted */}
        <div className="relative w-[15%] h-12 flex justify-between text-white bg-gray-700 rounded-md pl-2 pr-0">
          <button
            onClick={openTab2}
            className="h-12 text-white bg-gray-700 rounded-md "
          >
            <span>Newly Minted</span>
          </button>
          <img
            src={"/images/Drop-Down.png"}
            alt="dropdown"
            className="w-12 h-12 transition-transform duration-200 transform hover:scale-105"
          />
          {option2 && (
            <div
              ref={catMenu2}
              className="absolute left-0 w-full mt-2 bg-gray-700 rounded-md shadow-lg"
            >
              {newMint.map((key) => (
                <p
                  key={key}
                  className="px-4 py-2 text-white cursor-pointer hover:bg-gray-600"
                  onClick={() => {
                    Internal_show(key);
                    setOption2(false);
                  }}
                >
                  {key}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* For Sale */}
        <div className="relative w-[15%] h-12 flex justify-between text-white bg-gray-700 rounded-md pl-2 pr-0">
          <button
            onClick={openTab3}
            className="h-12 text-white bg-gray-700 rounded-md "
          >
            <span>For Sale</span>
          </button>
          <img
            src={"/images/Drop-Down.png"}
            alt="dropdown"
            className="w-12 h-12 transition-transform duration-200 transform hover:scale-105"
          />
          {option3 && (
            <div
              ref={catMenu3}
              className="absolute left-0 w-full mt-2 bg-gray-700 rounded-md shadow-lg"
            >
              {newBuy.map((key) => (
                <p
                  key={key}
                  className="px-4 py-2 text-white cursor-pointer hover:bg-gray-600"
                  onClick={() => {
                    Internal_show(key);
                    setOption3(false);
                  }}
                >
                  {key}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add New Project Button */}
      <div className="flex justify-between w-[14%] h-12 text-white bg-gray-700 border-2   border-[#21fc0d] rounded-md p-2  ">
        <button className="add-new-project-btn" onClick={openModal}>
          Add New Project
        </button>

        {isModalOpen && <Modal onClose={closeModal} />}

        <IoAddOutline
          className="ml-10 border-2 border-white rounded-md text-[2rem] transition-transform duration-200 transform hover:scale-105 cursor-pointer"
          onClick={openModal}
        />
      </div>
    </div>
  );
};

export default OilfieldHeader;
