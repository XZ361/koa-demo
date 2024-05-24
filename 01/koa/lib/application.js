const http = require("http");

class Application {
  constructor() {
    this.middleware = []; //保存用户添加的中间件函数
  }
  listen(...args) {
    const serve = http.createServer(this.callback());
    serve.listen(...args);
  }
  use(fn) {
    this.middleware.push(fn);
  }
  compose(middleware) {
    // 异步递归遍历调用中间件函数
    return function () {
      const dispatch = (index) => {
        if (index >= middleware.length) return Promise.resolve();
        const fn = middleware[index];
        return Promise.resolve(fn({}, () => dispatch(index + 1)));
      };
      return dispatch(0);
    };
  }
  callback() {
    // console.log("111");
    const fnMiddleware = this.compose(this.middleware);
    const handleRequest = (req, res) => {
      fnMiddleware()
        .then(() => {
          console.log("end");
          res.end("hello koa ");
        })
        .catch((err) => {
          res.end(err.message);
          console.log("err", err);
        });
    };
    return handleRequest;
  }
}
module.exports = Application;
