import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/utils/constants/server_url";
import { removeUser } from "@/utils/slices/userSlice.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

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
    }
  };

  return (
    <nav className="p-1 sticky top-0 bg-[#09090b] z-50">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Welcome message aligned to the left */}
        <div className="text-2xl font-semibold text-left text-slate-400">
          <Link to={`/browse/${user?._id}`}> Welcome {user?.fullName}.</Link>
        </div>

        {/* Avatar on the right */}
        <div className="relative">
          <NavigationMenu className="pt-2">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-[#09090b] text-[#fafafa]">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[100px] gap-1 p-2 md:w-[100px] md:grid-cols-1 lg:w-[100px]">
                    <li>
                      <Link to={`/browse/${user?._id}/create-blog`}>
                        Create
                      </Link>
                    </li>
                    <li>
                      <Link to={`/browse/${user?._id}/my-blogs`}>My Blogs</Link>
                    </li>
                    <li>
                      <Link>Setting</Link>
                    </li>
                    <li>
                      <Button onClick={handleLogout} variant="destructive">
                        Logout
                      </Button>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <hr className="border-t border-white" />
    </nav>
  );
};

export default Navbar;
