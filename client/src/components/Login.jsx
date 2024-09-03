import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 block w-full text-black"
            required
          />
        </div>
        <div className="mb-6">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 block w-full text-black"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;
