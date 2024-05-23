const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
  // console.log(ctx.req.method);
  // console.log(ctx.headers);
  // console.log(ctx.method);
  // ctx.body = "hello koa";
  // ctx.res.end("hello koa res");
  const path = ctx.path;
  if (path === "/") {
    ctx.body = "home";
  } else if (path === "/foo") {
    ctx.body = "foo 页面";
  } else {
    ctx.body = "404 not Found";
  }
});
app.listen(3000, () => {
  console.log("服务启动成功");
});
