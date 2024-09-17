import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { Textarea } from "@/components/ui/textarea";
import { BASE_URL } from "@/utils/constants/server_url";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((store) => store.user);

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    const token = localStorage.getItem("accessToken");

    try {
      await axios.post(`${BASE_URL}/blogs/create-blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/browse/${user?._id}/my-blogs`);
    } catch (error) {
      console.error("Error creating blog:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Create a New Blog</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-6">
          <Label htmlFor="title" className="text-xl font-semibold block mb-2">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            className="w-full text-base px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-[#fafafa] text-[#09090b] bg-opacity-80 focus:bg-[#fafafa] transition-colors"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <Label
            htmlFor="coverImage"
            className="text-xl font-semibold block mb-2"
          >
            Cover Image (Optional)
          </Label>
          <Input
            id="coverImage"
            type="file"
            className="w-full text-base px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-[#fafafa] text-[#09090b] bg-opacity-80 focus:bg-[#fafafa] transition-colors"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="mb-6">
          <Label
            htmlFor="description"
            className="text-xl font-semibold block mb-2"
          >
            Description
          </Label>
          <Textarea
            id="description"
            className="w-full text-base px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-[#fafafa] text-[#09090b] bg-opacity-80 focus:bg-[#fafafa] transition-colors"
            placeholder="Enter blog description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            required
          ></Textarea>
        </div>

        <Button
          type="submit"
          className="w-full px-4 py-3 text-lg font-semibold text-white rounded-lg transition-colors"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <ThreeDots color="#fafafa" height={24} width={24} />
            </div>
          ) : (
            "Create Blog"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
