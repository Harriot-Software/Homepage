import React from 'react';
import axios from 'axios';

import Head from "next/head";

import Navigation from '../_components/navigation';

const PageHandler = require('../public/_js/contact').PageHandler;
const NavigationHandler = require('../public/_js/navigation').NavigationHandler;

class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mailgun: {
                status: "",
                error: false
            },
            form: {
                firstName: "",
                lastName: "",
                emailAddress: "",
                companyName: "",
                emailBody: "",

                firstNameCheck: true,
                lastNameCheck: true,
                emailAddressCheck: true,
                companyNameCheck: true,
                emailBodyCheck: true
            }
        };
    }

    /* When component mounts, initialize page handler */
    componentDidMount() {

        /**
         * Start pageHandler
         */
        new PageHandler().Init();

        /**
         * Start navigationHandler
         */
        new NavigationHandler().Init();

    }

    /* Reset inputs in form */
    resetForm() {
        this.setState({
            form: {
                firstName: "",
                lastName: "",
                emailAddress: "",
                companyName: "",
                emailBody: "",

                firstNameCheck: true,
                lastNameCheck: true,
                emailAddressCheck: true,
                companyNameCheck: true,
                emailBodyCheck: true
            }
        });
    }

    /* Filters names in form inputs */
    static validateFormStringInput(string, maxLength) {
        if (string.length > maxLength || string.length === 0) { return false; }
        const nameRegex = /^[a-zA-Z]+(?:[-\s][a-zA-Z]+)*$/;
        return nameRegex.test(string);
    }

    /* Filters email in form input */
    static validateFormEmailInput(email) {
        if (email.length > 254 || email.length === 0) { return false; }
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    /* Filters email body input */
    static validateFormBodyInput(body) {
        return body.length <= 200000;
    }

    /* Handles name input change in form */
    formInputChange(inputType, e) {

        const inputTypeCheck = inputType + "Check";

        const tempState = this.state;
        const tempFormState = this.state.form;

        const form = { ...tempFormState};
        form[inputType] = e.target.value;

        this.setState({ ...tempState, form }, () => {

            let isValidField = true;

            if (inputType === "firstName" || inputType === "lastName" || inputType === "companyName") {
                isValidField = Contact.validateFormStringInput(this.state.form[inputType], 50);
            } else if (inputType === "emailAddress") {
                isValidField = Contact.validateFormEmailInput(this.state.form[inputType]);
            } else if (inputType === "emailBody") {
                isValidField = Contact.validateFormBodyInput(this.state.form[inputType]);
            }

            const tempState = this.state;
            const tempFormState = this.state.form;

            const form = { ...tempFormState};

            form[inputTypeCheck] = isValidField;

            this.setState({ ...tempState, form });
        });

    }

    /* Handles form submissions */
    submitForm() {

        const form = this.state.form;

        if (!(form.firstName && form.lastName && form.emailAddress && form.emailBody)) {
            throw new Error("Some required information is missing.");
        }

        axios({
            method: "POST",
            url: "https://dev.harriot.fi/send-mail",
            data: form,
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => {

            if (response.data.error) {

                console.error(response.data.error);

                this.setState({
                    mailgun: {
                        status: "error",
                        error: response.data.error.message
                    }
                });

            } else {

                if (response.data.status === 'success') {

                    this.resetForm();

                    this.setState({
                        mailgun: {
                            status: "success",
                            error: false
                        },
                    });

                } else {

                    console.error("Something went wrong while sending email.");

                    this.setState({
                        mailgun: {
                            status: "error",
                            error: "Unkown error."
                        },
                    });

                }
            }

        }).catch( error => console.error(error.message));
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Harriot - Contact us</title>

                    <meta name="description" content="Contact Harriot Software via email." />

                    <meta name="keywords" content="wed design, web development, software development, bots, scraping" />

                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                    <link rel="canonical" href="https://harriot.fi/contact" />

                    <meta name="robots" content="all"/>

                    <link rel="apple-touch-icon" sizes="180x180" href="_favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="_favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="_favicon/favicon-16x16.png" />
                    <link rel="manifest" href="_favicon/site.webmanifest" />
                    <link rel="mask-icon" href="_favicon/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />

                    <link rel="stylesheet" href="_styles/common.css" />
                    <link rel="stylesheet" href="_styles/navigation.css" />
                    <link rel="stylesheet" href="_styles/contact.css" />

                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                          crossOrigin="anonymous" />
                </Head>

                <Navigation />

                <div className="page">

                    <h1 className="page__title">
                        <img src="_img/Page_titles_contact.png" alt="CONTACT US"/>
                    </h1>

                    <div className="container">

                        <div className="sidebar">
                            <button className="social-icon facebook" type="button">
                                <span><i className="fab fa-facebook-f fa-2x" /></span>
                            </button>
                            <button className="social-icon linkedin" type="button">
                                <span><i className="fab fa-linkedin-in fa-2x" /></span>
                            </button>
                            <button className="social-icon github" type="button">
                                <span><i className="fab fa-github fa-2x" /></span>
                            </button>
                        </div>

                        <div className={ `message_success ${this.state.mailgun.status === "success" ? "" : "hidden"}` }>
                            Your message was sent successfully. We'll get back to you shortly.
                        </div>

                        <div className={ `message_error ${this.state.mailgun.status === "error" ? "" : "hidden"}` }>
                            Something went wrong while sending your message. Please try again later.
                        </div>

                        <form encType="application/x-www-form-urlencoded"
                              className="contact-form"
                              id="contact-form"
                              method="POST"
                              onSubmit={ (e) => {
                                  e.preventDefault();
                                  this.submitForm();
                              }} >

                            <fieldset className="email-step active" id="step-email-details">

                                <div className="email-step__title">
                                    <h2>
                                        <span>Send us</span> an email with the form below!
                                    </h2>
                                    <p>
                                        You won't need to sign in to send a message.
                                    </p>
                                    <p>
                                        Your information will only be used to contact you regarding your inquiry.
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="first-name">
                                        First name:
                                    </label>
                                    <div className="form-error hidden" id="first-name-error">
                                        Enter a name!
                                        <i className="fas fa-sort-up fa-2x" />
                                    </div>
                                    <input type="text"
                                           id="first-name"
                                           name="first_name"
                                           placeholder="First name"
                                           value={this.state.form.firstName}
                                           onChange={this.formInputChange.bind(this, "firstName")}
                                           required/>
                                </div>

                                <div>
                                    <label htmlFor="last-name">
                                        Last name:
                                    </label>
                                    <div className="form-error hidden" id="last-name-error">
                                        Enter a name!
                                        <i className="fas fa-sort-up fa-2x" />
                                    </div>
                                    <input type="text"
                                           id="last-name"
                                           name="last_name"
                                           placeholder="Last name"
                                           value={this.state.form.lastName}
                                           onChange={this.formInputChange.bind(this, "lastName")}
                                           required/>
                                </div>

                                <div>
                                    <label htmlFor="email-address">
                                        Contact email:
                                    </label>
                                    <div className="form-error hidden" id="email-address-error">
                                        Enter an email address!
                                        <i className="fas fa-sort-up fa-2x" />
                                    </div>
                                    <div className="form-error hidden" id="email-address-error-invalid">
                                        Address is invalid!
                                        <i className="fas fa-sort-up fa-2x" />
                                    </div>
                                    <input type="email"
                                           id="email-address"
                                           name="email_address"
                                           placeholder="Email address"
                                           value={this.state.form.emailAddress}
                                           onChange={this.formInputChange.bind(this, "emailAddress")}
                                           required/>
                                </div>

                                <div>
                                    <label htmlFor="company-name">
                                        Company (optional):
                                    </label>
                                    <input type="text"
                                           id="company-name"
                                           name="company_name"
                                           placeholder="Company (optional)"
                                           value={this.state.form.companyName}
                                           onChange={this.formInputChange.bind(this, "companyName")}
                                    />
                                </div>

                            </fieldset>

                            <fieldset className="email-step" id="step-email-body">

                                <div className="email-step__title">
                                    <h2>
                                        <span>Write</span> your message.
                                    </h2>
                                </div>

                                <label>
                                    <textarea id="email-body"
                                              name="email_body"
                                              placeholder="Your message..."
                                              tabIndex="-1"
                                              value={this.state.form.emailBody}
                                              onChange={this.formInputChange.bind(this, "emailBody")}
                                              required />
                                </label>

                                <div className="form-error hidden" id="email-body-error">
                                    Please enter a message!
                                    <i className="fas fa-sort-up fa-2x" />
                                </div>

                                <div className="form-error hidden" id="email-body-error-invalid">
                                    Message contains forbidden characters!
                                    <i className="fas fa-sort-up fa-2x" />
                                </div>

                            </fieldset>

                            <div className="contact-form__controls">

                                <div className="contact-form__controls__progress">
                                    <div className="contact-form__controls__progress__bar">
                                    <span className="contact-form__controls__progress__bar__content progress-50"
                                          id="progress-content" />
                                    </div>
                                </div>

                                <div className="contact-form__controls__buttons">
                                    <button type="button"
                                            id="form-previous"
                                            disabled>
                                        Previous
                                    </button>
                                    <button type="button"
                                            id="form-next">
                                        Next step
                                    </button>
                                    <input type="submit"
                                           className="hide"
                                           id="form-send"
                                           value="Send my message!"/>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;