const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    const pageData = {
        tittle: "Login",
    }
    res.status(200).render("login",pageData);
});


module.exports = router;
