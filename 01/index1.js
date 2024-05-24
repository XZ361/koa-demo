const Koa = require("./koa");
const app = new Koa();
app.use((ctx, next) => {
  //   console.log(ctx.req.url);
  //   console.log(ctx.req.url);
  // console.log(ctx.request.header);
  // console.log(ctx.request.url);
  // console.log(ctx.request.method);
  // console.log(ctx.request.query);
  // console.log(ctx.request.path);
  // rl);
  console.log(ctx.header);
  console.log(ctx.method);
  console.log(ctx.url);
  console.log(ctx.query);
  console.log(ctx.path);
});
const one = (ctx, next) => {
  console.log(">>one");
  next();
  console.log("<<one");
};
const two = (ctx, next) => {
  console.log(">>two");
  next();
  console.log("<<two");
};
const three = (ctx, next) => {
  console.log(">>three");
  next();
  console.log("<<three");
};

app.use(one);
app.use(two);
app.use(three);
// console.log(app.middleware);
app.listen(3000, () => {
  console.log("服务成功启动");
});
