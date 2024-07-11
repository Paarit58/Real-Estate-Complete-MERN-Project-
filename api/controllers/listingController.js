import Listing from "../models/listing.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllListings = catchAsync(async (req, res, next) => {
  console.log(typeof req.query);
  console.log(req.query)
  const queryObject = new ApiFeatures(Listing.find(), req.query)
    .search()
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await queryObject.query;

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

export const getListing = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  if (!listing) {
    next(new AppError("No asset found", 404));
  }
  res.status(200).json({
    status: "success",
    data: listing,
  });
});

export const createListing = catchAsync(async (req, res, next) => {
  const doc = await Listing.create({...req.body,user:req.user._id});

  res.status(201).json({
    status: "success",
    data: doc,
  });
});

export const updateListing = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const doc = await Listing.findByIdAndUpdate(id, req.body, {
    new: true,
    runvalidators: true,
  });
  if (!doc) next(new AppError("There is no listing with that id", 404));
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

export const deleteListing = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const doc = await Listing.findByIdAndDelete(id);
  if (!doc) next(new AppError("There is no listing with that id", 404));
  res.status(200).json({
    status: "success",
    message: "Your listing has been deleted",
    data: doc,
  });
});
