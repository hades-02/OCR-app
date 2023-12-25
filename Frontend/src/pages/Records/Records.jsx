import useGetRecords from "../../hooks/useFetchData";
import RecordList from "../../components/Records/RecordList";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";

const Records = () => {
  const { data, loading, error } = useGetRecords(
    `${import.meta.env.VITE_BACKEND_URL}/`
  );

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">All Records</h2>
        </div>
      </section>

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <section>
          <div className="container">
            <RecordList records={data.records} />
          </div>
        </section>
      )}
    </>
  );
};

export default Records;
