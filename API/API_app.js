const express = require('express');

const bodyParser = require('body-parser');
const compression = require('compression');

const http = require('http');

class Main {

  constructor(environment) {

    this.config = require('./private/js/config');

    this.app = express();

    this.app.use(bodyParser({ extended: false }));
    this.app.use(compression());

    this.environment = environment;

  }

  Init() {
    this.CreateHTTPS();

    this.SetRoutes();
  }

  CreateHTTPS() {

    if (this.environment === "dev") {

      http.createServer(this.app).listen(this.config.ports.ssl_dev, () => {
        console.log(`API listening to SSL traffic on port ${this.config.ports.ssl_dev}, Enviroment: ${this.environment}`);
      });

    } else {
      http.createServer(this.app).listen(this.config.ports.ssl, () => {
        console.log(`API listening to SSL traffic on port ${this.config.ports.ssl}, Enviroment: ${this.environment}`);
      });
    }

  }

  SetRoutes() {

  }

}

module.exports = {
  Main
};