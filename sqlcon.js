const mysql = require('mysql2');
const fs = require('fs');
let con = mysql.createConnection({
    host: 'localhost', // Change 'localhost:3306' to 'localhost'
    user: 'root',
    password: '1967'
});

con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('connected');
    let sql = 'use myoffice'
    con.query(sql, (err,res)=>{
        if (err) {
            throw err;
        }
        console.log("result" + res);
    })
    con.query('select * from employee', (err,res)=>{
        if (err) {
            throw err;
        }
        // console.log("result" + JSON.stringify(res));
        fs.writeFile('employee.json',JSON.stringify(res),(err)=>{
            if(err) throw err;
            console.log("created");
        })
        res.forEach(x=>{
            console.log(x);
        })
    })
});
