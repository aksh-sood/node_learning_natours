const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError= require("./utils/appError");
const globalErrorHandler=require("./controllers/errorController");

const app = express();

app.use(morgan("dev"));
app.use(express.static(`4-natours/starter/public/`));

app.use(express.json());
app.use((req, res, next) => {
  console.log("hello from middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours",createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id",deleteTour);

app.all("*",(req,res,next) => {
  // const err=new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.statusCode=404;
  // err.status="Fail";
  
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})

app.use(globalErrorHandler)

module.exports = app;
