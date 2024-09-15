import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/utils/constants/server_url";

const DetailedBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const getBlogDetails = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(`${BASE_URL}/blogs/get-blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlog(response.data.data);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, []);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const { coverImage, title, description, owner, createdAt } = blog;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {coverImage && (
        <div className="w-full h-[300px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl md:text-5xl font-bold mt-8 text-center">
        {title}
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-gray-500">
        <div className="text-sm md:text-base">
          By <span className="font-medium">{owner?.fullName}</span>
        </div>
        <div className="text-sm md:text-base">Published on {formattedDate}</div>
      </div>

      <div className="mt-8 text-lg md:text-xl leading-relaxed text-gray-700">
        {description.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetailedBlog;
