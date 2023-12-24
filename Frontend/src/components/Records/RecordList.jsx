/* eslint-disable react/prop-types */
import RecordCard from "./RecordCard";

const RecordList = ({ records }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {records &&
        records.map((record) => (
          <RecordCard key={record._id} record={record} />
        ))}
    </div>
  );
};

export default RecordList;
