const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use((req, res, next) => {
  console.log("hello from middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync("4-natours/starter/dev-data/data/tours-simple.json")
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (req.params.id * 1 > tours.length || !tour) {
    return res.status(404).json({ status: "fail", message: "Invalid Id" });
  }

  res.status(200).json({
    status: "success",
    // results: tours.length,
    data: {
      tours: tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    "4-natours/starter/dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: "fail", message: "Invalid Id" });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated Tour here>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: "fail", message: "Invalid Id" });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours",createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id",deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
tourRouter.route("/").get(getAllTours).post(createTour);

tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
