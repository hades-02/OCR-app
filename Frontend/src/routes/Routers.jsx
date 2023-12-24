import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Records from "../pages/Records/Records";
import UpdateRecord from "../pages/Records/updateRecord";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/records" element={<Records />} />
      <Route path="/records/:id" element={<UpdateRecord />} />
    </Routes>
  );
};

export default Routers;
