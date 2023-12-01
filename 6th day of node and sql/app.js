const express = require("express");
const app = express();
const path = require("path");
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const connectDB = require("./DB/database");
const staticUri = path.join(__dirname, "public");
const port = "5507";
// console.log(connectDB.fetchUsers());
async function main() {
  try {
    const datas = await connectDB.insertUsers("tom3sa5","abcd124");
    console.log(datas);
  } catch (error) {
    throw error;
  }
}
// main();
app.set("view engine", "pug");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticUri));
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
