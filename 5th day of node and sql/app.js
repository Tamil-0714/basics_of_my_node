const express = require("express");
const app = express();
const path = require("path");
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const connectDB = require("./DB/database");
const staticUri = path.join(__dirname, "public");
const port = "5507";
connectDB.fetchUsers();
// console.log(connectDB.fetchUsers());
app.set("view engine", "pug");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticUri));
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

