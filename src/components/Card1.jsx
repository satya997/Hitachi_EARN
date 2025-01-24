import React, { useState } from "react";
import Modal from "../components/Modal";
import { formatDate } from "../utils/helper";
import { useNavigate } from "react-router-dom";
const Card = ({ prj_id, prj_name, start, end, status, nft, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isupdateclick, setupdateclick] = useState(false);
  const navigate = useNavigate();
  const upatateclick = () => {
    setupdateclick(true);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    navigate("/oilfield_asset_marketplace", { replace: true });
    setIsModalOpen(false);
    setupdateclick(false);
  };
  return (
    <div className="card bg-white border rounded-lg shadow-lg w-[21rem] h-[28rem] mr-1 mb-1">
      <figure className="mb-4">
        <img
          src={"/images/well-head.webp"}
          alt={prj_name || "Project"}
          className="rounded-lg h-[10rem] w-[21rem] object-cover"
        />
      </figure>
      <div className="card-body !mt-0 h-[100px] pt-0 pl-2 pr-2">
        <p className="font-bold">ProjectId: {prj_id}</p>
        <h2 className="mb-0 text-xl font-semibold">Project: {prj_name}</h2>
        <p className="font-bold">
          Start: {formatDate(start)} | End: {formatDate(end)}
        </p>
        <p>
          <span className="font-bold">Project Status:</span> {status || "N/A"}
        </p>
        <p>
          <span className="font-bold">NFT Token Supply:</span> {nft || "N/A"}
        </p>
        <div className="card-actions !mt-5 flex justify-between">
          <button
            className="btn btn-outline btn-primary w-[48.5%]"
            onClick={() => openModal(prj_id)}
          >
            Update
          </button>

          {isModalOpen && (
            <Modal
              prj_id={prj_id}
              onClose={closeModal}
              upatateclick={upatateclick}
              isUpdateModal={true}
            />
          )}
          <button className="btn btn-outline btn-success w-[48.5%]">Buy</button>
        </div>
      </div>
    </div>
  );
};
export default Card;
