const express = require("express");
const router = express.Router();
const connectDB = require("../DB/database");
const bcrypt = require('bcrypt');

async function insertUserData(userId, pass) {
  try {
    const result = await connectDB.insertUsers(userId, pass);
    return result;
  } catch (error) {
    console.error("error message", error);
    throw error;
  }
}

router.get("/", (req, res) => {
  const pageData = {
    tittle: "Registration",
  };
  res.status(200).render("register", pageData);
});
router.post("/", async (req, res) => {
  const userid = req.body.userId;
  const pass = req.body.pass;
  if (req.body.pass === req.body.cpass) {
    try {
      const result = await insertUserData(userid, await bcrypt.hash(pass ,1));
      console.log(result);
      if (result && result.affectedRows > 0) {
        res.status(200).json({ message: "User inserted successfully" });
      } else if (result && result.msg === "ER_DUP_ENTRY") {
        // res.status(500).json({message:"duplicate entry"}
        console.log("duplicated me");
        const dupEntry = req.body;
        dupEntry.tittle = "Registration";
        dupEntry.msg = "User id already taken"
        res.status(200).render("register", dupEntry);
        
      } else {
        res.status(500).json({ error: "Failed to insert user" });
      }
    } catch (error) {
      console.error(`some other error ${error}`);
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({ error: "Passowrd doesn't match" });
  }
});

module.exports = router;
