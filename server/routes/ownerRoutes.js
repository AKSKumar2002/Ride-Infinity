import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addBike,
  changeRoleToOwner,
  deleteCar, // consider renaming this in the controller too to deleteBike for clarity
  getDashboardData,
  getOwnerCars, // consider renaming to getOwnerBikes for clarity
  toggleCarAvailability, // consider renaming to toggleBikeAvailability
  updateUserImage
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

// Change role to owner
ownerRouter.post("/change-role", protect, changeRoleToOwner);

// Add a new bike (image upload required)
ownerRouter.post("/add-bike", upload.single("image"), protect, addBike);

// Get all bikes listed by this owner
ownerRouter.get("/bikes", protect, getOwnerCars);

// Toggle availability of a bike
ownerRouter.post("/toggle-bike", protect, toggleCarAvailability);

// Delete a bike
ownerRouter.post("/delete-bike", protect, deleteCar);

// Get dashboard data for owner
ownerRouter.get("/dashboard", protect, getDashboardData);

// Update user image
ownerRouter.post("/update-image", upload.single("image"), protect, updateUserImage);

export default ownerRouter;
