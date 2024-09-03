import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Browse = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar />
      <main className="flex-grow">{/* Content goes here */}</main>
      <Footer />
    </div>
  );
};

export default Browse;
