/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { Textarea } from "@/components/ui/textarea";
import { BASE_URL } from "@/utils/constants/server_url";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store?.user);

  const getBlogDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs/get-blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { title, description, coverImage } = response.data.data;
      setTitle(title);
      setDescription(description);
      setCoverImage(coverImage);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (coverImage && coverImage instanceof File) {
      formData.append("coverImage", coverImage);
    }

    try {
      await axios.put(`${BASE_URL}/blogs/update-blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/browse/${user?._id}/my-blogs`);
    } catch (error) {
      console.error("Error while updating blog:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  useEffect(() => {
    getBlogDetails();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Edit Blog</h1>
      <form onSubmit={updateBlog} encType="multipart/form-data">
        <div className="mb-6">
          <Label htmlFor="title" className="text-xl font-semibold block mb-2">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-[#fafafa] bg-[#09090b] bg-opacity-70 focus:bg-[#09090b] transition-colors"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="mb-6">
          <Label
            htmlFor="coverImage"
            className="text-xl font-semibold block mb-2"
          >
            Cover Image
          </Label>
          <Input
            id="coverImage"
            type="file"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-[#09090b] bg-opacity-10 focus:bg-[#09090b] transition-colors"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-[#fafafa] bg-[#09090b] bg-opacity-10 focus:bg-[#09090b] transition-colors"
            placeholder="Enter blog description"
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
            "Update Blog"
          )}
        </Button>
      </form>
    </div>
  );
};

export default EditBlog;
