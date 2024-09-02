import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createBlog,
  editBlog,
  getAllBlogs,
} from "../controllers/blog.controller.js";

const router = Router();

router.route("/create-blog").post(
  verifyJWT,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  createBlog
);

router.route("/edit-blog/:blogId").post(
  verifyJWT,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  editBlog
);
router.route("/get-all-blogs").get(verifyJWT, getAllBlogs);

export default router;
