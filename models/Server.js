const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = 8080;
    this.middlewares();
    this.router();
  }

  middlewares() {
    this.app.use(cors());
  }

  router() {
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`http://localhost:${this.port}/ 👽`);
    });
  }
}
module.exports = Server;
