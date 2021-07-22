const express = require('express');
const cors = require('cors');
const rootRouter = require('../routers/rootRouter');
const dbConexion = require('../database/dbConexion');
const fileUpload = require('express-fileupload');

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.url_base = process.env.URL_BASE;
    this.app = express();
    this.conectar();
    this.middleware();
    this.routers();
  }
  async conectar() {
    await dbConexion();
  }
  middleware() {
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }
  routers() {
    this.app.use(this.url_base, rootRouter);
  }
  start() {
    this.app.listen(this.port, () => {
      console.log('Server run in port:', this.port);
    });
  }
}

module.exports = Server;
