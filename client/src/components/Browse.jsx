import Blogs from "./Blogs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "@/utils/slices/userSlice";

const Browse = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser._id) {
        dispatch(addUser(storedUser));
      } else {
        navigate("/register");
      }
    }
  }, [dispatch, user, navigate]);

  return (
    <div className="scroll-smooth min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar />
      <main className="flex-grow">
        {/* Content goes here */}
        <Blogs />
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
