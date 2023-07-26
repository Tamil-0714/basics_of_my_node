const mysql = require("mysql2");
const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1967",
  database: "myoffice",
});

connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("connected");
});

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.send("Hello, this is the root route!");
    // Alternatively, you can serve the index.html file like this:
    // res.sendFile(__dirname + "/index.html");
  });

app.get("/user", (req, res) => {
  connection.query("select * from employee", (err, entity) => {
    if (err) {
      console.log(err);
      res.status(500).json({error:'error fetchig obj'})

    }else{
        res.json(entity);
    }

  });
});

app.listen(8000,()=>{
    console.log('server runing port 8000 yes');
})