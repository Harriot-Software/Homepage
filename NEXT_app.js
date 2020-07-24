const next = require('next');
const express = require('express');

const bodyParser = require('body-parser');

const compression = require('compression');

const http = require('http');

const Mailer = require('./private/class/Mailer.js');

class Main {

    constructor(environment) {

        this.config = require('./private/files/config.js');

        /**
         * Create HTTPS app for SSL port
         * @type {app}
         */
        this.app = express();

        this.app.use(bodyParser({ extended: false }));
        this.app.use(compression());

        /**
         * Create HTTP app for http port
         * @type {app}
         */
        this.httpApp = express();

        this.httpApp.set('port', this.config.ports.http);
        this.httpApp.get('*', (req, res, next) => {
            res.redirect('https://' + req.headers.host + req.path);
        });

        this.environment = environment;
        const dev = this.environment === "dev";


        /**
         * Initialize next.js
         * @type {never}
         */
        this.next_app = next({ dev });
        this.next_handle = this.next_app.getRequestHandler();

    }

    async Init() {
        await this.next_app.prepare();

        this.CreateHTTP();
        this.CreateHTTPS();

        this.EstablishRoutes();
    }

    EstablishRoutes() {

        this.app.post('/send-mail', (request, res) => {

            const params = request.body;

            const config = {
                "domain": this.config.mailgun.domain,
                "key": this.config.mailgun.key
            };

            const mailer = new Mailer(config, params);

            mailer.Sanitize().then(() => {

                mailer.Verify();
                mailer.Init();
                mailer.Send();
                return res.send({ status: "success" });

            }).catch((error) => { return res.send({ status: "error", error: error }); });

        });

        /**
         * Direct all other traffic to next.js handler
         */
        this.app.all('*', (req, res) => {
            return this.next_handle(req, res);
        });

    }

    CreateHTTP() {

        /**
         * Create HTTP server for redirecting traffic to HTTPS
         */
        http.createServer(this.httpApp).listen(this.httpApp.get('port'), () => {
            console.log(`Listening to HTTP traffic on port ${this.httpApp.get('port')}`);
        });

    }

    CreateHTTPS() {

        /**
         * Create HTTPS server
         * Environment depends on command line variable
         * If "all" variable given, create both environment
         */

        const ports = this.config.ports;

        if (this.environment === "all") {

            http.createServer(this.app).listen(ports.ssl, () => {
                console.log(`Harriot Software is listening on port ${ports.ssl}, Environment: ${this.environment}`);
            });

            http.createServer(this.app).listen(ports.ssl_dev, () => {
                console.log(`Harriot Software is listening on port ${ports.ssl_dev}, Environment: ${this.environment}`);
            });

        } else {

            const listeningPort = this.environment === "prod" ? ports.ssl : ports.ssl_dev;

            http.createServer(this.app).listen(listeningPort, () => {
                console.log(`Harriot Software is listening on port ${listeningPort}, Environment: ${this.environment}`);
            });

        }

    }
}

module.exports = {
    Main
};