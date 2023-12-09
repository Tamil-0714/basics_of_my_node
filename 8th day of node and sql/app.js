const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logoutRoutes");
const homeRoute = require("./routes/homeRoutes");
const connectDB = require("./DB/database");
const middleware = require("./middleware/middleware");
const staticUri = path.join(__dirname, "public");
const port = process.env.PORT;

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "unaku ennapa all iruku",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(express.static(staticUri));
app.use("/register", middleware.isLogin, registerRoute);
app.use("/login", middleware.isLogin, loginRoute);
app.use("/logout", logoutRoute);
app.use(["/", "/index", "/home"], middleware.isAlreadyLogin, homeRoute);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
