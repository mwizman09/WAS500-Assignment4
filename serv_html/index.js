const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const routeResponseMap = {
  "/": "views/index.html",
  "/index.html": "views/index.html",
  "/book-list.html": "views/book-list.html",
  "/book1.html": "views/book1.html",
  "/book2.html": "views/book2.html",
  "/book3.html": "views/book3.html",
  "/AtomicHabits.jpg": "public/images/AtomicHabits.jpg",
  "/Frankenstein.jpg": "public/images/Frankenstein.jpg",
  "/MazeRunner.jpg": "public/images/MazeRunner.jpg",
  "/error": "<h1>error</h1>",
};

const app = http.createServer();
app.on("request", (req, res) => {

  var date = new Date()
  var date1 = date.getFullYear()+'/'+date.getMonth()+'/'+date.getDay()
  var time = date.getHours()+':'+date.getSeconds()

  res.writeHead(httpStatus.StatusCodes.OK, {
    "Content-Type": "text/html",
  });

  if (routeResponseMap[req.url]) {
    fs.readFile(routeResponseMap[req.url], (error, data) => {
      res.write(data);
      res.end();
      console.log(`Request received for page ${req.url} on ${date1} at ${time}`)
    });
  } else {
    res.end(routeResponseMap["/error"]);
    console.log(`Request for page ${req.url} could not be found on the server. ${date1} ${time}`)
  }
});
app.listen(port);
console.log(`The server has started and is listening on port number:${port}`);
