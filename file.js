
const http = require('http');
var fs = require('fs');

// fs.appendFile('newfile.txt','some dummy content',(err)=>{
//     if(err) console.error(err);
//     console.log("saved");
// })

// fs.open('newfile.txt', 'w',(err,file)=>{
//     if (err) {
//         // console.error(err);
//     }
//     console.log( file);
//     console.log("saves");
// })
fs.readFile('README.md', 'utf8',(err,file)=>{
    if (err) {
        console.log(err);
    }
    console.log(file);
})








// const fs = require('fs');
// http.createServer((req, res)=>{
//     fs.readFile('index.html',(err,data)=>{
//         res.writeHead(200,{'Content-Type' : 'plain/html'});
//         res.write(data)
//         return res.end()
//     })
// }).listen(8080);

// var http = require('http');

// http.createServer(function (req, res) {
//   //Open a file on the server and return its content:
//   fs.readFile('index.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(8080);