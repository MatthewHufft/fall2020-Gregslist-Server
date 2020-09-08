import mongoose from "mongoose";
const Schema = mongoose.Schema;

const House = new Schema(
  {
    bedrooms: { type: String, required: true },
    bathrooms: { type: String, required: true },
    levels: { type: Number, required: true },
    price: { type: Number, required: true, min: 0 },
    imgUrl: { type: String, required: true, default: "https://placehold.it/200x200" },
    description: { type: String },
    tags: [{ type: String }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default House;
