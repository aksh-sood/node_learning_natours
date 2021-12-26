const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`4-natours/starter/dev-data/data/tours-simple.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not available yet",
  });
};
