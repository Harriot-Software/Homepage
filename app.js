/**************************************************************************************************
 *                                                                                                *
 *                       This file is subject to the terms and conditions                         *
 *                       defined in file 'LICENSE.txt', which is located                          *
 *                       in the source code package of this file.                                 *
 *                                                                                                *
 *                       Copyright (c) 2020 Harriot Software.                                     *
 *                                                                                                *
 **************************************************************************************************/

/**
 * Port forwarding & main application
 */

const NEXT_APP = require('./NEXT_app').Main;

const proxy = require('redbird')({

    ssl: {
        port: 443,
        https2: true
    },

    bunyan: false

});

proxy.register("www.harriot.fi", "http://localhost:8082", {

    ssl: {
        key: "/etc/letsencrypt/live/www.harriot.fi/privkey.pem",
        cert: "/etc/letsencrypt/live/www.harriot.fi/cert.pem"
    }

});

proxy.register("dev.harriot.fi", "http://localhost:8083", {

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
if (!args[0]) { throw new Error("Command line argument missing: | dev / prod / all | environment"); }

const environment = args[0];

new NEXT_APP(environment).Init();
