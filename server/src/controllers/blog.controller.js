import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileNameWithExtension = parts[parts.length - 1]; // e.g., "sample.jpg"
  const [publicId] = fileNameWithExtension.split("."); // Split by "." to remove file extension
  return publicId;
};

const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and Description are required");
  }

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const folder_name = "coverImage";
  const coverImage = await uploadOnCloudinary(coverImageLocalPath, folder_name);

  const blog = await Blog.create({
    title,
    description,
    coverImage: coverImage?.secure_url || "",
    owner: req.user._id,
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: { blog: blog._id },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, blog, "Blog created successfully"));
});

const editBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { title, description } = req.body;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to edit this blog");
  }

  let coverImage;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    const coverImageLocalPath = req.files.coverImage[0].path;
    const path = "memoir/coverImage";

    const folder_name = "coverImage";
    coverImage = await uploadOnCloudinary(coverImageLocalPath, folder_name);

    if (!coverImage) {
      throw new ApiError(400, "Failed to upload cover image to Cloudinary");
    }

    // Removing the old cover image from Cloudinary
    if (blog.coverImage) {
      const publicId = extractPublicId(blog.coverImage); // Function to extract the public ID
      await cloudinary.uploader.destroy(`${path}/${publicId}`);
    }

    // Update the blog's cover image URL
    blog.coverImage = coverImage.secure_url;
  }

  blog.title = title || blog.title;
  blog.description = description || blog.description;

  await blog.save();

  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog updated successfully"));
});

const getAllBlogs = asyncHandler(async (_, res) => {
  try {
    const blogs = await Blog.find({})
      .select("title description coverImage owner")
      .populate({
        path: "owner",
        select: "fullName email avatar",
      });

    if (!blogs.length) {
      throw new ApiError(404, "No blogs found");
    }

    return res.status(200).json({
      status: 200,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    throw new ApiError(500, "Error fetching blogs");
  }
});

export { createBlog, editBlog, getAllBlogs };
