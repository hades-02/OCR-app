/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { formatDate } from "../../utils/formatDate";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const RecordCard = ({ record }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  const updateButtonHandler = () => {
    navigate(`/records/${record._id}`);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/${record._id}`, {
        method: "DELETE",
      });

      setLoading(false);
      toast.success("Record deleted successfully.");

      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <div className="mt-4 flex items-center justify-between gap-10">
            <button
              className="ml-3 w-full bg-primaryColor p-3 text-[14px] leading-5 rounded-md text-white"
              onClick={cancelDeleteHandler}
            >
              CANCEL
            </button>
            <button
              className="mr-3 w-full bg-red-600 p-3 text-[14px] leading-5 rounded-md text-white"
              onClick={confirmDeleteHandler}
            >
              DELETE
            </button>
          </div>
        }
      >
        <h3 className="mt-7 text-[16px] leading-7 lg:text-[16px] lg:leading-[30px] font-semibold text-headingColor">
          Do you want to proceed and delete this record?
        </h3>
      </Modal>
      <div className="shadow-panelShadow p-3 lg:p-5 rounded-md items-center">
        <div className="ml-9">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-[18px] leading-[30px] lg:text-[20px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
              {`Name: ${record.name} ${record.lastName ? record.lastName : ""}`}
            </h3>
          </div>
          <div className="w-full mt-2 lg:mt-4 flex items-center justify-between">
            <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[14px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
              Identification Number <br /> {record.idNum}
            </span>
          </div>

          <div className="w-full mt-[18px] lg:mt-5 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] leading-7 lg:text-[16px] lg:leading-[30px] font-semibold text-headingColor">
                {`Date Of Birth: ${formatDate(record.dateOfBirth)}`}
              </h3>
              <h3 className="text-[16px] leading-7 lg:text-[16px] lg:leading-[30px] font-semibold text-headingColor">
                {`Date Of Issue: ${formatDate(record.dateOfIssue)}`}
              </h3>
              <h3 className="text-[16px] leading-7 lg:text-[16px] lg:leading-[30px] font-semibold text-headingColor">
                {`Date Of Expiry: ${formatDate(record.dateOfExpiry)}`}
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-10">
          <button
            disabled={loading && true}
            onClick={updateButtonHandler}
            className="ml-3 w-full bg-primaryColor p-3 text-[14px] leading-5 rounded-md text-white"
          >
            Update
          </button>
          <button
            disabled={loading && true}
            onClick={showDeleteWarningHandler}
            className="mr-3 w-full bg-red-600 p-3 text-[14px] leading-5 rounded-md text-white"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
};

export default RecordCard;
