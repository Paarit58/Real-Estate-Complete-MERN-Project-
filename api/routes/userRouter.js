import express from "express";
import {
  deleteMe,
  deleteUser,
  getAllUsers,
  getUser,
  updateMe,
  updateUser,
} from "../controllers/userController.js";
import {
  signin,
  signup,
  protect,
  signout,
  updatePassword,
  forgotPassword,
  resetPassword,
  signInWithGoogle,
} from "../controllers/authController.js";

const userRouter = express.Router();
userRouter.route("/signup").post(signup);
userRouter.route("/signin").post(signin);
userRouter.route("/googleSignin").post(signInWithGoogle);
userRouter.route("/signout").get(signout);

userRouter.route("/").get(getAllUsers);
userRouter.route("/updateMe").patch(protect, updateMe, updateUser);
userRouter.route("/deleteMe").delete(protect, deleteMe, deleteUser);
userRouter.route("/updateMyPassword").patch(protect, updatePassword);
userRouter.route("/forgotPassword").post(forgotPassword);
userRouter.route("/resetPassword/:resetToken").patch(resetPassword);

userRouter
  .route("/:id")
  .get(getUser)
  .patch(protect, updateUser)
  .delete(deleteUser);
export default userRouter;
