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

    const ports = this.config.ports;

    const listeningPort = this.environment === "dev" ? ports.ssl_dev : ports.ssl;

    http.createServer(this.app).listen(listeningPort, () => {
      console.log(`API listening to SSL traffic on port ${this.config.ports.ssl_dev}, Environment: ${this.environment}`);
    });

  }

  SetRoutes() {

  }

}

module.exports = {
  Main
};