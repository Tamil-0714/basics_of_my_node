const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const pageData = {
    tittle: "Registration",
  };
  res.status(200).render("register", pageData);
});
router.post("/", (req, res) => {
    console.log(req.body.userId);
    console.log(req.body.pass);
    console.log(req.body.cpass);

    res.status(200).send("Registration successful!");
});

module.exports = router;
