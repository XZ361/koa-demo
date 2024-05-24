const Koa = require("koa");
const Router = require("@koa/router");
const static = require("koa-static");
const path = require("path");
const mount = require("koa-mount");
const fs = require("fs");
const util = require("util");
const compose = require("koa-compose");
const { log } = require("console");

const app = new Koa();
// app.use(static("./public"));
// mount：设置请求的虚拟路径
app.use(mount("/foo", static(path.join(__dirname, "./public"))));

const router = new Router();

// app.use((ctx) => {
// console.log(ctx.req.method);
// console.log(ctx.headers);
// console.log(ctx.method);
// ctx.body = "hello koa";
// ctx.res.end("hello koa res");
// const path = ctx.path;
// if (path === "/") {
//   ctx.body = "home";
// } else if (path === "/foo") {
//   ctx.body = "foo 页面";
// } else {
//   ctx.body = "404 not Found";
// }

// });
// 使用官方路由
// router.get("/", (ctx) => {
//   ctx.body = "home";
// });
router.get("/foo", (ctx) => {
  ctx.body = "foo";
});
// 路由重定向
router.get("/bar", (ctx) => {
  ctx.redirect("/foo");
});
router.post("/", (ctx) => {
  ctx.body = "foopost/";
});
router.get("/user/:id", (ctx) => {
  ctx.body = "user";
});
// 中间件栈结构
// const one = (ctx, next) => {
//   console.log(">>one");
//   next();
//   console.log("<<one");
// };
// const two = (ctx, next) => {
//   console.log(">>two");
//   next();
//   console.log("<<two");
// };
// const three = (ctx, next) => {
//   console.log(">>three");
//   next();
//   console.log("<<three");
// };
// 异步中间件
// app.use(async (ctx, next) => {
//   const data = await util.promisify(fs.readFile)("./views/index.html", "utf8");
//   ctx.body = data;
//   next();
// });
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = err.message;
    // ctx.throw(404);
    // ctx.throw(500);
    ctx.app.emit("error", err, ctx);
  }
});
app.use(async (ctx, next) => {
  JSON.parse("{}");
  // ctx.body = "hello koa";
  // return next();
  return next();
});
// 异步中间件
app.use(async (ctx, next) => {
  const data = await util.promisify(fs.readFile)("./views/index111.html");
  ctx.type = "html";
  ctx.body = data;
  await next();
});
app.on("error", (err) => {
  console.log(err);
});
// app.use(one).use(two).use(three);
// 合并中间件
// app.use(compose([one, two, three]));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("服务启动成功");
});
