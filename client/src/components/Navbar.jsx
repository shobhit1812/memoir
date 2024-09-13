import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/utils/constants/server_url";
import { removeUser } from "@/utils/slices/userSlice.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
    <nav className="p-5 sticky top-0 backdrop-blur-lg z-50 isDark shadow-lg">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl px-6 md:px-16 lg:px-36">
        <div className="text-lg font-semibold">Welcome {user?.fullName}.</div>
        <div className="flex-col md:flex-row md:flex md:items-center transition-all duration-300 ease-in-out ">
          <Avatar onClick={toggleMenu} className="cursor-pointer">
            <AvatarImage src={user?.avatar} alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 rounded-lg bg-slate-600">
              <Button
                onClick={handleLogout}
                className="w-full text-center"
                variant="destructive"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
