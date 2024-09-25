import axios from "axios";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/utils/constants/server_url";
import { removeUser } from "@/utils/slices/userSlice.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIconRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/users/logout`, null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(removeUser());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetting = () => {
    alert("***** Feature is in development mode *****");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userIconRef.current && !userIconRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="p-2 sticky top-0 backdrop-blur shadow-sm shadow-white z-50">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Welcome message aligned to the left */}
        <div className="text-2xl font-semibold text-left pl-4">
          <Link to={`/browse/${user?._id}`}>Memoir</Link>
        </div>

        {/* Avatar on the right */}
        <div className="relative pr-3" ref={userIconRef}>
          <Avatar onClick={toggleMenu} className="cursor-pointer">
            <AvatarImage src={user?.avatar} alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* If user clicks */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-32 rounded-lg bg-gray-700 shadow-lg z-10">
              <ul className="grid w-[130px] gap-2 p-2 md:w-[130px] md:grid-cols-1 lg:w-[130px] text-lg">
                <li className="hover:underline">
                  <Link to={`/browse/${user?._id}/create-blog`}>
                    Create Blog
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link to={`/browse/${user?._id}/my-blogs`}>My Blogs</Link>
                </li>
                <li
                  className="hover:underline cursor-pointer"
                  onClick={() => handleSetting()}
                >
                  Setting
                </li>
                <li>
                  <Button
                    className="w-full text-center text-lg"
                    onClick={handleLogout}
                    variant="destructive"
                    disabled={loading} // Disable button during loading
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <ThreeDots
                          height="24"
                          width="24"
                          color="#ffffff"
                          ariaLabel="loading"
                        />
                      </div>
                    ) : (
                      "Logout"
                    )}
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
