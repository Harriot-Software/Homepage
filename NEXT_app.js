const next = require('next');
const express = require('express');

const bodyParser = require('body-parser');

const compression = require('compression');

const http = require('http');

const Mailer = require('./private/_js/Mailer.js').Mailer;

class Main {

    constructor(environment) {

        this.config = require('./private/_js/config.js');

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

            try {

                mailer.Verify();
                mailer.Init();
                mailer.Send();

                return res.send({ status: "success" });

            } catch (error) {
                return res.send({
                    status: "error",
                    error: error
                });
            }
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
         */
        if (this.environment === "dev") {

            http.createServer(this.app).listen(this.config.ports.ssl_dev, () => {
                console.log(`Harriot Software is listening on port ${this.config.ports.ssl_dev}, Environment: ${this.environment}`);
            });

        } else if (this.environment === "prod") {

            http.createServer(this.app).listen(this.config.ports.ssl, () => {
                console.log(`Harriot Software is listening on port ${this.config.ports.ssl}, Environment: ${this.environment}`);
            });

        }
    }
}

module.exports = {
    Main
};