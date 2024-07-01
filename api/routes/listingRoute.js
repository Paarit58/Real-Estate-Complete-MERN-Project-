import express from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getListing,
  updateListing,
} from "../controllers/listingController.js";
import { protect } from "../controllers/authController.js";

const listingRouter = express.Router();
listingRouter.route("/").get(getAllListings).post(protect, createListing);

listingRouter
  .route("/:id")
  .get(getListing)
  .patch(protect, updateListing)
  .delete(protect, deleteListing);

export default listingRouter;
