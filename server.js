const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
console.log(process.env);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});