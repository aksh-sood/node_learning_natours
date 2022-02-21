const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");
// const tours = JSON.parse(
//   fs.readFileSync(`4-natours/starter/dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   // if (req.params.id * 1 > tours.length) {
//   return res.status(404).json({ status: "fail", message: "Invalid Id" });
//   // }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: "fail",
//       message: "missing name or price",
//     });
//   }
//   next();
// };


exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
}


exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
    const tours = await features.query;
    // const query=Tour.find().where("duration").equals(5).where("easy");
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err })
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { tour }
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err
    });
  }

  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    // results: tours.length,
    // data: {
    // tours: tour,
    // },
  });
};

exports.createTour = async (req, res) => {

  //   try{
  //     const{
  //         name,
  //         rating,
  //         price
  //        } = req.body;

  //       let newTour = new Tour({
  //           // _id : new mongoose.Types.ObjectId(),
  //           name,
  //           rating,
  //           price
  //       });
  //       await newTour.save();
  //       res.status(201).json({message: "Tour Created", data: newTour});
  //   }
  //        catch(err) {
  //        console.log(err);
  //        res.status(500).json({
  //        error:err
  //        });
  // }
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  //   console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: { tour: newTour },
    });

  } catch (err) {
    res.status(400).json(
      { status: "fail", message: err }
    )
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }

};

exports.deleteTour = async (req, res) => {

  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }

};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: "$difficulty",
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" }
        }
      },
      //this sort is to sort with respect to the new results developed by the aggregation pipeline
      { $sort: { avgPrice: 1 } },
    ]);
    
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err })
  }
}

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      { $unwind: "$startDates" },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" }
        }
      },
      { $addFields: { month: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { numTourStarts: -1 } },
      {$limit:12}
    ]);
    res.status(200).json({
      status: "success",
      results: plan.length,
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err })
  }
}
