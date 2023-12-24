import HashLoader from "react-spinners/HashLoader";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import useGetRecord from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";

const UpdateRecord = () => {
  const { id } = useParams();

  const { data, loading, error } = useGetRecord(`${BASE_URL}/${id}`);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    idNum: "",
    name: "",
    lastName: "",
    dateOfBirth: "",
    dateOfIssue: "",
    dateOfExpiry: "",
  });

  useEffect(() => {
    setFormData({
      idNum: data.idNum,
      name: data.name,
      lastName: data.lastName,
      dateOfBirth: String(data.dateOfBirth).substring(0, 10),
      dateOfIssue: String(data.dateOfIssue).substring(0, 10),
      dateOfExpiry: String(data.dateOfExpiry).substring(0, 10),
    });
  }, [data, setFormData]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setIsLoading(false);
      toast.success(message);
      navigate("/records");
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="mt-10 px-4 mx-auto max-w-screen-md">
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
                disabled={isLoading && true}
                type="submit"
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              >
                {isLoading ? (
                  <HashLoader size={25} color="#ffffff" />
                ) : (
                  "Update Record"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateRecord;
