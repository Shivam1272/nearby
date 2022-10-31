import Home from "./Home";
import Footer from "./component/Footer";
import VendorHome from "./component/VendorHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./component/userComponents/UserHome";
import TakeAway from "./component/userComponents/TakeAway";
import MyOrders1 from "./component/userComponents/MyOrders";
import MyOrders from "./component/VendorComponents/MyOrders";
import Guideline from "./component/VendorComponents/Guideline";
import About from "./component/About";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<VendorHome />} />
          <Route path="/takeaway" element={<TakeAway />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/user/myorder" element={<MyOrders1 />} />
          <Route path="/vendor/order" element={<MyOrders />} />
          <Route path="/vendor/guideliance" element={<Guideline />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
