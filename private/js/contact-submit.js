const Mailgun = require("mailgun-js");

class ContactSubmit {

    static HandleError(error) {
        console.debug(error.message);
    }

    static Handle(request, res, config) {

        const content = request.body;

        res.end();

        this.SendMail(content, config);
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

        mailgun.messages().send(data, function (error, body) {

            console.debug(config.key + "\n" + config.domain);

            if (error) {
                console.error(error);
            }

            if (body) {
                console.debug(body);
            }
        });
    }
}

module.exports = {
    "ContactSubmit": ContactSubmit
};