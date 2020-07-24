const Mailgun = require('mailgun-js');

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

    Init() {

        this.mailgun = new Mailgun({ apiKey: this.config.key, domain: this.config.domain });

        const html = "Message from <b>'"+ this.params.firstName + " " + this.params.lastName + "'</b> "
            + (this.params.companyName !== "" ? "from the company <b>'" + this.params.companyName + "'</b> " : "")
            + "with the email address of " + this.params.emailAddress + ":<br /><br /><br />"
            + this.params.emailBody;

        this.data = {
            from: 'Lauri Pakkanen <lauri.pakkanen@harriot.fi>',
            to: 'Kuikka87@gmail.com',
            subject: 'Business inquiry from website',
            html: html
        };
    }

    Send() {
        this.mailgun.messages().send(this.data)
            .catch((error) => { throw error; })
    }
}

module.exports = Mailer;