const express = require("express");
const fs = require("fs");
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`4-natours/starter/dev-data/data/tours-simple.json`)
);

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

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
