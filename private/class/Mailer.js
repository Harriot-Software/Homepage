const Mailgun = require('mailgun-js');
const Sanitizer = require('./Sanitizer');

class Mailer {

    constructor(config, params) {
        this.config = config;
        this.params = params;
    }

    Verify() {

        if (!(this.config && this.config.domain && this.config.key)) {
            throw new Error("Some required configuration is missing.");
        }

        if (!(this.params && this.params.firstName && this.params.lastName && this.params.emailAddress && this.params.emailBody)){
            throw new Error("Some required information is missing.");
        }

    }

    Sanitize() {
        return new Promise((resolve, reject) => {

            const sanitizationOptions = Sanitizer.optionConfig.sanitizeAll;

            for (let [key, value] of Object.entries(this.params)) {
                this.params[key] = Sanitizer.sanitizehtml(value, sanitizationOptions);
            }

            resolve();
        });
    }

    Init() {

        this.params.emailBody = this.params.emailBody.replace(/\n/g, '<br />');

        this.mailgun = new Mailgun({ apiKey: this.config.key, domain: this.config.domain });

        const html = "Message from <b>'"+ this.params.firstName + " " + this.params.lastName + "'</b> "
            + (this.params.companyName !== "" ? "from <b>'" + this.params.companyName + "'</b> " : "")
            + ", email address: '" + this.params.emailAddress + "':<br /><br /><br />"
            + this.params.emailBody;

        this.data = {
            from: 'info <info@harriot.fi>',
            to: 'lauri-mikael.pakkanen@harriot.fi',
            subject: 'Message from Harriot.fi contact form',
            html: html
        };
    }

    Send() {
        this.mailgun.messages().send(this.data)
            .catch((error) => { throw error; })
    }
}

module.exports = Mailer;