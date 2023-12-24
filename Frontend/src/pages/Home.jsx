import { useState } from "react";
import { useNavigate } from "react-router-dom";

import HashLoader from "react-spinners/HashLoader";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);

  const [formData, setFormData] = useState({
    idNum: "",
    name: "",
    lastName: "",
    dateOfBirth: "",
    dateOfIssue: "",
    dateOfExpiry: "",
  });

  const navigate = useNavigate();

  const ocrServiceHandler = async () => {
    setExtracting(true);

    try {
      const res = await fetch(`${BASE_URL}/ocr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: selectedFile }),
      });

      const { message, data } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setFormData({
        idNum: data.idNum,
        name: data.name,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        dateOfIssue: data.dateOfIssue,
        dateOfExpiry: data.dateOfExpiry,
      });
      toast.success("Data extracted successfully");
      setExtracting(false);
    } catch (err) {
      toast.error("Data extraction failed, please provide a clear image.");
      setExtracting(false);
    }
    setSelectedFile(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/records");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="mt-10 px-4 mx-auto max-w-screen-md">
      <div className="mb-5 mt-7 flex items-center gap-3">
        {selectedFile && (
          <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
            <img src={selectedFile} alt="" className="w-full rounded-full" />
          </figure>
        )}
        <div className="ml-5 relative w-[140px] h-[50px]">
          <input
            type="file"
            name="photo"
            id="customFile"
            onChange={handleFileInputChange}
            accept=" .jpg, .png, .jpeg"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />

          <label
            htmlFor="customFile"
            className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
          >
            Upload ID Image
          </label>
        </div>
        {selectedFile && (
          <button
            disabled={loading && true}
            onClick={ocrServiceHandler}
            className="ml-7 w-3/12 bg-primaryColor text-white text-[16px] leading-[25px] rounded-lg px-4 py-3"
          >
            {extracting ? (
              <HashLoader size={25} color="#ffffff" />
            ) : (
              "Extract data"
            )}
          </button>
        )}
      </div>
      <form className="space-y-8" onSubmit={submitHandler}>
        <div className="mt-[15px] ">
          <div className="mb-5">
            <label htmlFor="idNum" className="form__label">
              Identification Number*
            </label>
            <input
              type="text"
              placeholder="Identification Number"
              name="idNum"
              value={formData.idNum}
              onChange={handleInputChange}
              className="form__input mt-2"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="form__label">
              Name*
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form__input mt-2"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="lastName" className="form__label">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="form__input mt-2"
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-10">
            <label htmlFor="dateOfBirth" className="w-6/12 form__label">
              Date Of Birth*
              <input
                type="date"
                placeholder=""
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                max={formData.dateOfIssue || undefined}
                className="form__input mt-2"
                required
              />
            </label>
            <label htmlFor="dateOfIssue" className="w-6/12 form__label">
              Date Of Issue*
              <input
                type="date"
                placeholder=""
                name="dateOfIssue"
                value={formData.dateOfIssue}
                onChange={handleInputChange}
                min={formData.dateOfBirth || undefined}
                max={formData.dateOfExpiry || undefined}
                className="form__input mt-2"
                required
              />
            </label>
            <label htmlFor="dateOfExpiry" className="w-6/12 form__label">
              Date Of Expiry*
              <input
                type="date"
                placeholder=""
                name="dateOfExpiry"
                value={formData.dateOfExpiry}
                onChange={handleInputChange}
                min={formData.dateOfIssue || undefined}
                className="form__input mt-2"
                required
              />
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Add Record"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
