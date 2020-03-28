/* Require global NPM packages */
const express = require("express");

const https = require('https');
const fs = require('fs');

/* Require internal scripts */
const contact_submit = require("./private/js/contact-submit").ContactSubmit;

class Main {
    constructor(){
        this.app = express();
    }

    /* Initialize program */
    Init(){
        this.Configure();
        this.ListenPorts();
        this.GetPage();
    }

    /* Configure program */
    Configure(){

        this.config = require("./private/js/config.js");

        /* Set view engine */
        this.app.set('view engine', 'ejs');

        /* Use public folder */
        this.app.use(express.static(this.config.assets, { dotfiles: 'allow' }));

        // Use urlencoder for express
        this.app.use(express.urlencoded({
            extended: true
        }));

        this.credentials = {
            key: fs.readFileSync('/etc/letsencrypt/live/dev.softwareshenanigans.com/privkey.pem', 'utf8'),
            cert: fs.readFileSync('/etc/letsencrypt/live/dev.softwareshenanigans.com/cert.pem', 'utf8'),
        };


        /* Set form handler for contact-submit */
        this.app.post('/contact-submit', (request, res) => {

            const content = request.body;

            const config = {
                "key": this.config.mailgun_api_key,
                "domain": this.config.mailgun_domain
            };

            /* Success */
            if (contact_submit.Handle(content, config)) {

                res.redirect(301, '/contact?msg=success');

            } else { /* Failed */

                res.redirect(301, '/contact?msg=error');

            }

        });
    }

    /* Set port to listen for connections on */
    ListenPorts(){

        /* Listen to connections on port 443 only */
        https.createServer(this.credentials, this.app).listen(this.config.ssl_port, () => {
            console.log(`SoftwareShenanigans is listening on port ${this.config.ssl_port}.`);
        });

    }

    /* Handle routes */
    GetPage(){

        /* Home page */
        this.app.get("/", (request, response) => {
            response.render("index");
        });

        /* Projects page */
        this.app.get("/projects", (request, response) => {
            response.render("projects");
        });

        /* Contact page */
        this.app.get("/contact", (request, response) => {
            response.render("contact");
        });

        /* About page */
        this.app.get("/about", (request, response) => {
            response.render("about");
        });
    }
}

/* Start program*/
const main = new Main();
main.Init();