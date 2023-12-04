const express = require("express");
const router = express.Router();
const connectDB = require("../DB/database");
const bcrypt = require("bcrypt");
async function fetchUsers(userId) {
  try {
    const result = await connectDB.fetchUsers(userId);
    return result;
  } catch (error) {
    console.error("error message", error);
    throw error;
  }
}
const pageData = {
  tittle: "Login",
};
router.get("/", (req, res) => {
  res.status(200).render("login", pageData);
});
router.post("/", async (req, res) => {
  if (req.body.userName.trim() && req.body.pass.trim()) {
    const result = await fetchUsers(req.body.userName);
    if (result[0]) {
      const passResult = await bcrypt.compare(
        req.body.pass,
        result[0].password
      );
      if (passResult) {
        req.session.UserSession = result[0];
        
        return res.redirect("/home");
        // res.status(200).render("home",homeData);
        // res.send("everthis is ok");
      } else {
        pageData.msg = "Invalid userID or password";
        res.status(200).render("login", pageData);
        return;
      }
    } else {
      pageData.msg = "Invalid userID or password";
      res.status(200).render("login", pageData);
      return;
    }

    return;
  }
  pageData.msg = "Invalid input";
  res.status(200).render("login", pageData);
});

module.exports = router;
