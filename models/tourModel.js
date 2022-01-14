const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  duration: { type: Number, required: [true, "A tour must have a duration"] },
  maxGroupSize: {
    type: Number, required: [true, "A tour must have a group size"]
  },
  difficulty: {
    type: String, required: [true, "A tour must have a difficulty"]
  },
  priceDiscount: Number,
  summary: { type: String, trim: true, required: [true, "Summary is required"] },
  description: { type: String, trim: true },
  imageCover: { type: String, required: [true, "Image is required"] },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
});
const Tour = mongoose.model("Tour", tourSchema);

// const testTour = new Tour({
//   name: "The Camper",
//   price: 99,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("ERROR 💔💔💔");
//     console.log(err);
//   });

module.exports = Tour;
