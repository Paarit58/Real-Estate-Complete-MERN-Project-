import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "./../models/user.js";

const filterObject = (obj, ...includedFields) => {
  let filteredObject = {};
  Object.keys(obj).forEach((field) => {
    if (includedFields.includes(field)) {
      filteredObject[field] = obj[field];
    }
  });
  return filteredObject;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    users,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (req.user._id !== req.params.id)
    next("You can only update your own account!", 401);

  const filteredData = filterObject(req.body, "username", "email", "avatar");
  // console.log(filteredData);

  const doc = await User.findByIdAndUpdate(id, filteredData, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "success",
    data: doc,
  });
});

export const updateMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

export const deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  if (req.user._id !== req.params.id)
    next("You can only delete your own account!", 401);

  const doc = await User.findByIdAndDelete(id);
  if (!doc)
    return next(
      new AppError("there is no document to be deleted for this id", 404)
    );

  res.status(200).json({
    status: "success",
    message: "Your account has been deleted",
    data: doc,
  });
});

export const deleteMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
