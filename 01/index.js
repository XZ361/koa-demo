const Koa = require("koa");
const Router = require("@koa/router");
const app = new Koa();
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
router.get("/", (ctx) => {
  ctx.body = "home";
});
router.get("/foo", (ctx) => {
  ctx.body = "foo";
});
router.post("/", (ctx) => {
  ctx.body = "foopost/";
});
router.get("/user/:id", (ctx) => {
  ctx.body = "user";
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("服务启动成功");
});
