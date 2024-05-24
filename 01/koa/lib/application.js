const http = require("http");

class Application {
  listen(...args) {
    const serve = http.createServer((req, res) => {
      res.end("My Koa");
    });
    serve.listen(...args);
  }
}
module.exports = Application;
