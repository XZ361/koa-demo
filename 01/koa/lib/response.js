const response = {
  set status(value) {
    this.res.statusCode = value;
  },
  _body: "",
  get body() {
    return this._body;
  },
  set body(value) {
    this._body = value;
  },
};
module.exports = response;
