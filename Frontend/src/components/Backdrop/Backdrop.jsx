/* eslint-disable react/prop-types */
import "./Backdrop.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

export default Backdrop;
