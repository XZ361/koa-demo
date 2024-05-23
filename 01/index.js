const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
  // console.log(ctx.req.method);

  // console.log(ctx.headers);
  console.log(ctx.method);
  ctx.body = "hello koa";
  // ctx.res.end("hello koa res");
});
app.listen(3000, () => {
  console.log("服务启动成功");
});
