const Mailgun = require("mailgun-js");

class ContactSubmit {

    static Handle(content, config) {

        return this.SendMail(content, config);
    }

    static SendMail(content, config) {

        if (!(config && config.domain && config.key)) {
            throw new Error("Some required configuration is missing.");
        }

        if (!(content && content.first_name && content.last_name && content.email_address && content.email_body)) {
            throw new Error("Some required information is missing.");
        }

        const mailgun = new Mailgun({ apiKey: config.key, domain: config.domain });

        const data = {
            from: 'CEO <CEO@harriot.fi>',
            to: 'Kuikka87@gmail.com',
            subject: 'Hello',
            html: 'Testing some Mailgun awesomness!'
        };

        mailgun.messages().send(data)
            .then(() => { return true; })
            .catch(error => {
                console.error(error);
                return false;
            });
    }
}

module.exports = {
    ContactSubmit
};