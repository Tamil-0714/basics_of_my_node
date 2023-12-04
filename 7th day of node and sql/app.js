const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logoutRoutes");
const connectDB = require("./DB/database");
const middleware = require("./middleware/middleware");
const staticUri = path.join(__dirname, "public");
const port = "5507";
// console.log(connectDB.fetchUsers());
async function main() {
  try {
    const datas = await connectDB.insertUsers("tom3sa5", "abcd124");
    console.log(datas);
  } catch (error) {
    throw error;
  }
}
// main();
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
app.use("/logout",logoutRoute);

app.get(["/", "/index", "/home"], middleware.isAlreadyLogin, (req, res) => {
  const homeData = {
    tittle: "Hoem page",
  };
  res.status(200).render("home", homeData);
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
