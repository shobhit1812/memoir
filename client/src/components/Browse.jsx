import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { removeUser } from "@/utils/slices/userSlice.js";
import axios from "axios";
import { BASE_URL } from "@/utils/constants/server_url";

const Browse = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?._id) {
      navigate("/register");
    }
  }, [navigate, user?._id]);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/users/logout`, null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      dispatch(removeUser());

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar onLogout={handleLogout} />
      <main className="flex-grow">{/* Content goes here */}</main>
      <Footer />
    </div>
  );
};

export default Browse;
