const Tour = require("./../models/tourModel");

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

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    // tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
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

exports.createTour =async (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;

  // const newTour = Object.assign({ id: newId }, req.body);
  const newTour =await Tour.create(req.body);
  tours.push(newTour);


      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });

  
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    // data: {
    //   tour: "<Updated Tour here>",
    // },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
