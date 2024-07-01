import jwt from "jsonwebtoken";
import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import util from "node:util";
import crypto from "crypto";
import { signedCookie } from "cookie-parser";
import { sendEmail } from "../utils/email.js";

const createSendToken = catchAsync(async (user, res, statusCode) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
});

export const signup = catchAsync(async (req, res, next) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    avatar: req.body.avatar,
  };
  const currentUser = await User.create(newUser);

  createSendToken(currentUser, res, 201);
});

export const signin = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    next(new AppError("You nedd to provide your username and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Invalid email_id or password", 404));
  }
  createSendToken(user, res, 200);
});

export const signout = (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      status: "success",
      message: "User has been logged out",
    });
  } catch (err) {
    next(err);
  }
};

export const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) next(new AppError("Not Authenticiated", 400));

  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  //   console.log(decoded);

  const user = await User.findById(decoded.id);

  if (!user)
    next(
      new AppError("The user belonging to this token no longer exists", 404)
    );

  if (user.changedPasswordAfter(decoded.iat)) {
    next(
      new AppError("Your password has been changed. Please sign in again", 400)
    );
  }

  req.user = user;

  next();
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.correctPassword(req.body.passwordCurrent))) {
    return next(new AppError("Incorect passsword", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, res, 201);
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  let email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("There is no user with this email", 400));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.prtocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;

  const resetMessage = `Plaese submit patch request at this url ${resetUrl} to reset your password!! `;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset : valid for 10 min",
      message: resetMessage,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to your email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("Failed to send token", 500));
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const hashedToken = crypto
    .createHash("sha-256")
    .update(resetToken)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError("The reset token is invalid", 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // await user.save()

  try{await user.save();}catch(error){res.status(400).json({
    message:"error"
  })}
  createSendToken(user, res, 201);
});
