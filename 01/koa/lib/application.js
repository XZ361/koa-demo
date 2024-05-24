const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Application {
  constructor() {
    this.middleware = []; //保存用户添加的中间件函数
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
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
    return function (context) {
      const dispatch = (index) => {
        if (index >= middleware.length) return Promise.resolve();
        const fn = middleware[index];
        return Promise.resolve(fn(context, () => dispatch(index + 1)));
      };
      return dispatch(0);
    };
  }
  createContext(req, res) {
    const context = Object.create(this.context);
    const request = (context.request = Object.create(this.request));
    const response = (context.response = Object.create(this.response));
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  }
  callback() {
    // console.log("111");
    const fnMiddleware = this.compose(this.middleware);
    const handleRequest = (req, res) => {
      // 每个请求都会创建一个独立的上下文对象，他们之间不会互相污染
      const context = this.createContext(req, res);
      fnMiddleware(context)
        .then(() => {
          console.log("end");
          res.end(context.body);
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
