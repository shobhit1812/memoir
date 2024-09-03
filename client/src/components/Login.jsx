import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Login = () => {
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
        <form className="w-full max-w-md">
          {/* Email Field */}
          <div className="mb-4">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full text-[#09090b]"
            />
          </div>
          {/* Password Field */}
          <div className="mb-6">
            <Label htmlFor="password" className="">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full text-[#09090b]"
            />
          </div>
          <Button
            type="submit"
            className="w-full text-[#09090b] mb-4"
            variant="outline"
          >
            Login
          </Button>
          <div className="text-sm">
            <p>
              New to Memoir?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
