const { log } = require("console");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const connector = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1967",
  database: "main",
});

connector.connect((err) => {
  if (err) {
    log(err);
  } else log("connected");
});
app.use(express.json());
app.use(express.static("public"));
app.get("/contactInfo", (req, res) => {
  connector.query("select * from person", (err, entity) => {
    if (err) console.error(err);
    else {
      res.json(entity);
    }
  });
});
app.post("/uploadData", (req, response) => {
  const data = req.body;
  console.log(data);
  const Name = data.Name;
  const Age = data.Age;
  const Contact = data.Contact;
  connector.query(
    `
    insert into person(Name,Age,Contact) values ('${Name}', ${Age}, ${Contact});`,
    (err, res) => {
      if (err) throw err;
      console.log(res);
      response.json(res);
    }
  );
});
app.post('/editContact',(req,res)=>{
  const cID = req.body.cID;
  connector.query(`select * from person where id = ${cID}`,(err,entity)=>{
    console.log(entity);
    res.json(entity[0]);
  })
})
app.post('/editData', (req,res)=>{
  const editData = req.body
  // console.log(editData);
  const query = `update person set Name = '${editData.Name}', Age = ${editData.Age}, Contact= ${editData.Contact} where id = ${editData.Id}`
  console.log(query);
  connector.query(query,(err,update)=>{
    if(err) throw err;
    res.json(update);
  })
})
app.post('/delContact',(req,res)=>{
  const delData = req.body.cID
  connector.query(`delete from person where id = ${delData}`,(err,delJson)=>{
    if(err) throw err;
    res.json(delJson);
  })
  console.log(delData);
})
app.listen(5500, () => {
  log("port at 5500");
});
