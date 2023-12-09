const express = require("express");
const router = express.Router();
const connectDB = require("../DB/database");
router.get(["/", "/index", "/home"], (req, res) => {
    const homeData = {
      tittle: "Hoem page",
      userDetails: req.session.UserSession,
    };
    res.status(200).render("home", homeData);
  });


module.exports = router