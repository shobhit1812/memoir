import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * req.header("Authorization"): This retrieves the `Authorization` header from the incoming request, if it exists. For example, if the client sent the following header:
 * `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp9...`
 * req.header("Authorization") will return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp9...".
 *
 * So, req.header("Authorization")?.replace("Bearer ", ""); will retrieve only the token part from the Authorization header if it's present. *
 */

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired");
    } else {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
});
