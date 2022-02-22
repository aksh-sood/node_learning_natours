const mongoose = require("mongoose");
const slugify=require("slugify");
const validator=require("validator");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
    maxlength:[40,"Tour name must be less than 40 characters"],
    minlength:[10,"Tour name must be more than 10 characters"],
    validate:[validator.isAlpha,"Tour name must only contain characters"]
  },
  slug:String,
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min:[1,"rating must be greater than or equal to 1"],
    max:[5,"rating must be less than or equal to 5"]
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
    type: String,
    enum:{
    values:["easy","difficult","medium"],
    message:"difficulty is either easy medium or difficult"
  },
    required: [true, "A tour must have a difficulty"]
  },
  priceDiscount:{
  type: Number,
  validate:{validator:function(val){
    return val<this.price;
  },
message: "Discount price ({VALUE}) should be below the regular price"
}
  },
  summary: { type: String, trim: true, required: [true, "Summary is required"] },
  description: { type: String, trim: true },
  imageCover: { type: String, required: [true, "Image is required"] },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  secretTour:{
    type:Boolean,
  default:false
},
  startDates: [Date]
},
{
  toJSON:{ virtuals:true},
  toObject:{ virtuals:true},
});

tourSchema.virtual("durationWeeks").get(function(){
  return this.duration/7;
});

tourSchema.pre('save',function(next){
  this.slug=slugify(this.name,{lower:true});
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
