/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((store) => store.user);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="text-lg font-semibold">Welcome {user?.fullName}</div>

      <div className="relative">
        <Avatar onClick={toggleMenu} className="cursor-pointer">
          <AvatarImage src={user?.avatar} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg">
            <Button
              onClick={onLogout}
              className="w-full text-center"
              variant="destructive"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
