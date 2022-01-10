const fs = require("fs");
const Tour = require("./models/tourModel.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((con) => {
        console.log("DB connected succesfully");
    });
const tours = JSON.parse(fs.readFileSync("4-natours/after-section-08/dev-data/data/tours-simple.json", "utf-8"));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("data loaded successfully");
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("data deleted successfully");
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

console.log(process.argv);

if (process.argv[2] === "--import") { 
    importData(); 
} else if (process.argv[2] === "--delete") {
    deleteData();
}

