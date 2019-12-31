/* Require global NPM packages */
const express = require("express");

/* Require internal scripts */
const contact_submit = require("./private/js/contact-submit").ContactSubmit;

/* Require internal assets */
const favicon = require("serve-favicon");

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

        /* Set Favicon */
        this.app.use(favicon(this.config.favicon));

        /* Use public folder */
        this.app.use(express.static(this.config.assets));

        // Use urlencoder for express
        this.app.use(express.urlencoded({
            extended: true
        }));

        /* Set form handler for contact-submit */
        this.app.post('/contact-submit', (request, res) => {
            try {

                const config = {
                    "key": this.config.mailgun_api_key,
                    "domain": this.config.mailgun_domain
                };

                contact_submit.Handle(request, res, config);

            } catch (error) {
                contact_submit.HandleError(error);
            }
        });
    }

    /* Set port to listen for connections on */
    ListenPorts(){

        this.app.listen(this.config.ssl_port, "0.0.0.0", () => {
            console.log(`SoftwareShenanigans is listening on port ${this.config.ssl_port}.`);
        });

        this.app.listen(this.config.port, "0.0.0.0", () => {
            console.log(`SoftwareShenanigans is listening on port ${this.config.port}.`);
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