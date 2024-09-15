import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { addUser } from "@/utils/slices/userSlice";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
    <div className="scroll-smooth min-h-screen antialiased flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar />
      {/* Main content stays centered */}
      <main className="flex flex-grow justify-center items-center max-w-screen-lg mx-auto">
        {<Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
