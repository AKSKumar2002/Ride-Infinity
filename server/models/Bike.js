// Updated Schema (renamed Car to Bike)
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bikeSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    engineCapacity: { type: String, required: true },
    bikeType: { type: String, required: true },
    fuelType: { type: String },
    pricePerDay: { type: Number, required: true },
    mileage: { type: String, required: true },
    location: { type: String, default: "Coimbatore" },
    description: { type: String, required: true },
    isAvaliable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Bike = mongoose.model("Bike", bikeSchema);
export default Bike;