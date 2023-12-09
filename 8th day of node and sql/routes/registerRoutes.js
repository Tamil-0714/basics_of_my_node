const express = require("express");
const router = express.Router();
const connectDB = require("../DB/database");
const bcrypt = require("bcrypt");

async function insertUserData(name, userId, pass) {
  try {
    const result = await connectDB.insertUsers(name, userId, pass);
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
  const userid = req.body.userId.trim();
  const pass = req.body.pass.trim();
  const cpass = req.body.cpass.trim();
  const realName = req.body.name.trim();
  if (userid && pass && cpass && realName) {
    if (pass === cpass) {
      try {
        const result = await insertUserData(
          realName,
          userid,
          await bcrypt.hash(pass, 1)
        );
        if (result && result.affectedRows > 0) {
          res.redirect("/login");
        } else if (result && result.msg === "ER_DUP_ENTRY") {
          // res.status(500).json({message:"duplicate entry"}
          console.log("duplicated me");
          const dupEntry = req.body;
          dupEntry.tittle = "Registration";
          dupEntry.msg = "User id already taken";
          res.status(200).render("register", dupEntry);
        } else {
          res.status(200).render("register", { tittle: "registration" });
        }
      } catch (error) {
        res.status(200).render("register", { tittle: "registration" });
      }
    } else {
      const pageData = {
        tittle: "Registration",
        passNot: "border-color:red;",
        name: realName,
        userId: userid,
      };
      res.status(200).render("register", pageData);
    }
  } else {
    const pageData = {
      tittle: "Registration",
      fuckMsg: "U fucker don't act smart",
    };
    res.status(200).render("register", pageData);
  }
});

module.exports = router;
