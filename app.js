let http = require("http");
let hi = require("./sayhi");
let url = require("url");
http
  .createServer((req, res) => {
    let q = url.parse(req.url, true).query;
    let txt = q.year + "  " + q.month;
    res.writeHead(200, { "Content-type": "text/html" });
    res.write(`this is hi modulu ${hi.sayhi()}`);
    res.write(req.url);
    res.write("1");
    res.write(`\n2`);
    res.write(`\n3`);
    res.write(
      `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, deleniti?</p>`
    );
    res.write(
      `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta provident, ad officiis recusandae sequi consequatur temporibus! Deserunt, tenetur nesciunt?</p>`
    );
    res.write(`
    <div
      class="blue-box"
      style="background-color: blue; width: 300px; height: 300px"
    ></div>`);
    res.end(txt);
  })
  .listen(8080);

function value(one, two) {
  return one + two;
}

`<div
class="container"
style="display: flex; justify-content: center; align-items: center; height:100vh;"
  </div>
>`;
