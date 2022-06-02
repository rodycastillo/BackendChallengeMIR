const express = require("express");
const cors = require("cors");
const logger = require('morgan')
const { connectDB } = require("../database/config");
const userRouter = require("../controllers/user");
const favsRouter = require("../controllers/favs");

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.middlewares();
    this.connectionDB();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(logger('tiny'));
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  async connectionDB() {
    await connectDB();
  }

  routes() {
    this.app.use("/auth/local/", userRouter);
    this.app.use("/api/favs", favsRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`http://localhost:${this.port}/ 👽`);
    });
  }
}
module.exports = Server;
