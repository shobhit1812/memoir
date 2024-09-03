import axios from "axios";
import { useState } from "react";
import { PiEye } from "react-icons/pi";
import { BiHide } from "react-icons/bi";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/constants/server_url";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      await axios.post(`${BASE_URL}/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#09090b] text-[#fafafa]">
      <div className="lg:w-1/2 flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <form className="w-full max-w-md" onSubmit={handleRegister}>
          {/* Full Name Field */}
          <div className="mb-4">
            <Label className="block text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </Label>
            <Input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md text-[#09090b]"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <Label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md text-[#09090b]"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <Label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-md text-[#09090b]"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2  text-[#09090b]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BiHide size={20} /> : <PiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Avatar Upload Field */}
          <div className="mb-6">
            <Label className="block text-sm font-bold mb-2" htmlFor="avatar">
              Upload Avatar
            </Label>
            <Input
              type="file"
              id="avatar"
              onChange={handleAvatarChange}
              className="w-full px-4 py-2 border rounded-md text-gray-500"
              accept="image/*"
            />
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            className="w-full text-[#09090b] mb-4"
            variant="outline"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ThreeDots color="#09090b" height={24} width={24} />
              </div>
            ) : (
              "Register"
            )}
          </Button>

          {/* Login Link */}
          <p className="text-base">
            Already a member,{" "}
            <span className="text-blue-500 hover:text-blue-700">
              <Link to="/">Login</Link>
            </span>
          </p>
        </form>
      </div>

      {/* Welcome Section - Hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16">
        <h1 className="text-5xl font-bold mb-4 text-center">
          Welcome to Memoir
        </h1>
        <h2 className="text-2xl font-light text-center">
          A place to read, write, and deepen your understanding
        </h2>
      </div>
    </div>
  );
};

export default Register;
