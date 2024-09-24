import axios from "axios";
import { PiEye } from "react-icons/pi";
import { BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Rings } from "react-loader-spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "@/utils/slices/userSlice.js";
import { getAllUsers } from "@/utils/helper/getAllUsers";
import { BASE_URL } from "@/utils/constants/server_url.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });

      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(addUser(user));

      navigate(`/browse/${user?._id}`);
    } catch (error) {
      console.error(error.response?.data || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#09090b] text-[#fafafa]">
      {/* Left Section: Welcome Message */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center">
          Welcome to Memoir
        </h1>
        <h2 className="text-lg lg:text-2xl font-light text-center">
          A place to read, write, and deepen your understanding
        </h2>
      </div>

      {/* Right Section: Login Form */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
          Login
        </h1>
        <form className="w-full max-w-md" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <Label
              className="block text-sm lg:text-base font-bold mb-2"
              htmlFor="email"
            >
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
          <div className="mb-6">
            <Label
              className="block text-sm lg:text-base font-bold mb-2"
              htmlFor="password"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Write your password"
                className="w-full px-4 py-2 border rounded-md text-[#09090b]"
                required
                autoComplete="current-password"
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

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full text-[#09090b] mb-4"
            variant="outline"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Rings color="#09090b" height={24} width={24} />
              </div>
            ) : (
              "Login"
            )}
          </Button>

          {/* Register Link */}
          <p className="text-base">
            New to Memoir?{" "}
            <span className="text-blue-500 hover:text-blue-700">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
