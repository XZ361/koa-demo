const context = {
  get method() {
    return this.request.method;
  },
  get url() {
    return this.request.url;
  },
  //   get header() {
  //     return this.request.headers;
  //   },
  //   get path() {
  //     return this.request.path;
  //   },
  //   get query() {
  //     return this.request.query;
  //   },
};
defineProperty("request", "method");
defineProperty("request", "url");
defineProperty("request", "path");
defineProperty("request", "query");
defineProperty("response", "body");

function defineProperty(target, name) {
  Object.defineProperty(context, name, {
    get() {
      return this[target][name];
    },
    set(value) {
      this[target][name] = value;
    },
  });
}
module.exports = context;
