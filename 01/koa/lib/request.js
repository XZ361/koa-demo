const Url = require("url");
const request = {
  get header() {
    return this.req.headers;
  },
  get method() {
    return this.req.method;
  },
  get url() {
    return this.req.url;
  },
  get path() {
    return Url.parse(this.req.url).pathname;
  },
  get query() {
    return Url.parse(this.req.url, true).query;
  },
};
module.exports = request;
