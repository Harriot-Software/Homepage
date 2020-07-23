/**
 * Port forwarding & main application
 */

const NEXT_APP = require('./NEXT_app').Main;

const proxy = require('redbird')({

    ssl: {
        port: 443,
        https2: true
    },

});

proxy.register("www.harriot.fi", "http://localhost:8080", {

    ssl: {
        key: "/etc/letsencrypt/live/www.harriot.fi/privkey.pem",
        cert: "/etc/letsencrypt/live/www.harriot.fi/cert.pem"
    }

});

proxy.register("dev.harriot.fi", "http://localhost:8081", {

    ssl: {
        key: "/etc/letsencrypt/live/dev.harriot.fi/privkey.pem",
        cert: "/etc/letsencrypt/live/dev.harriot.fi/cert.pem"
    }

});

/**
 * Get environment from command line
 * @type {*[]}
 */
const args = process.argv.slice(2);
if (!args[0]) { throw new Error("Command line argument missing: dev / prod environment"); }

const environment = args[0];

new NEXT_APP(environment).Init();
