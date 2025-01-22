import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import "./index.css";
import MicroDashboard from "./pages/MicroDashboard";
import OilfieldAsset from "./pages/OilfieldAsset";
import Breadcrumbs from "./components/Breadcrumbs";
import AllGraphs from "./pages/AllGraphs";
// import Layout from "./component/Layout";
// import Loading from "./component/Loading";

const App = () => {
  return (
    <BrowserRouter>
          <div>
  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/microdashboard" element={<MicroDashboard />} />
        <Route path="/oilfield_asset_marketplace" element={<OilfieldAsset />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/graphs" element={<AllGraphs />} />
       
      </Routes>
      </div>

    </BrowserRouter>
  );
};

export default App;