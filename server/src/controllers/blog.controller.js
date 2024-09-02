import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

export { createBlog, getAllBlogs };
