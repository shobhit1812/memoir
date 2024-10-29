import axios from "axios";
import { PiEye } from "react-icons/pi";
import { BiHide } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "@/utils/constants/server_url";

const Setting = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [confirmOldPassword, setConfirmOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (oldPassword !== confirmOldPassword) {
      setErrorMessage("Password did not match");
    } else {
      setErrorMessage("");
    }
  }, [confirmOldPassword, oldPassword]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(
        `${BASE_URL}/users/change-password`,
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/browse/${user?._id}/setting`);
      toast.success("Password changed successfully!");

      setOldPassword("");
      setConfirmOldPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-screen-2xl mx-auto px-4">
      <ToastContainer position="bottom-left" />
      <h1 className="text-4xl mb-4">Setting</h1>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="w-full md:w-1/2 p-4">
          <img
            src={user?.avatar}
            alt="profile-pic"
            className="w-40 h-40 md:w-60 md:h-60 rounded-full mb-4 mx-auto md:mx-0"
          />
          <h1 className="text-2xl pb-2 text-center md:text-left">
            {user?.fullName}
          </h1>
          <h1 className="text-xl text-center md:text-left">{user?.email}</h1>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-3xl mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <Label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  value={oldPassword}
                  id="password"
                  placeholder="Write password"
                  className="w-full px-4 py-2 border rounded-md text-[#09090b]"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  autoComplete="password"
                />
              </div>
            </div>
            <div className="mb-4">
              <Label
                className="block text-sm font-bold mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  value={confirmOldPassword}
                  id="confirm-password"
                  placeholder="Write old password"
                  className="w-full px-4 py-2 border rounded-md text-[#09090b]"
                  onChange={(e) => setConfirmOldPassword(e.target.value)}
                  required
                  autoComplete="confirm-password"
                />
              </div>
            </div>
            {<h1 className="text-red-700 text-lg pb-3">{errorMessage}</h1>}
            <div className="mb-4 relative">
              <Label
                className="block text-sm font-bold mb-2"
                htmlFor="new-password"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  id="new-password"
                  placeholder="Write new password"
                  className="w-full px-4 py-2 border rounded-md text-[#09090b]"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="link"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiHide size={20} /> : <PiEye size={20} />}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-[#09090b] mb-4"
              variant="outline"
              disabled={loading || oldPassword !== confirmOldPassword}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <ThreeDots color="#09090b" height={24} width={24} />
                </div>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
