document.addEventListener("DOMContentLoaded", () => {

    const handler = new FormCarouselHandler();
    handler.Init();

    /* TESTING ONLY */
    //handler.Test(0);
});


class FormCarouselHandler {
    constructor(){

        this.form = document.getElementById("contact-form");

        this.progress_element = document.getElementById("progress-content");

        this.form_previous = document.getElementById("form-previous");
        this.form_next = document.getElementById("form-next");
        this.form_send = document.getElementById("form-send");

        /* All possible values for progress */
        this.progress_values = [
            "50",
            "100"
        ];

        /* Carousel pages */
        this.pages = [
            document.getElementById("step-email-details"),
            //document.getElementById("step-email-title"),
            document.getElementById("step-email-body")
        ];

        this.email_body = document.getElementById("email-body");

        this.email_details_fields = [
            document.getElementById("first-name"),
            document.getElementById("last-name"),
            document.getElementById("email-address")
        ];

        this.email_details_error_fields = [
            document.getElementById("first-name-error"),
            document.getElementById("last-name-error"),
            document.getElementById("email-address-error"),
            document.getElementById("email-address-error-invalid")
        ];

        this.email_body_field = document.getElementById("email-body");

        this.email_body_error_fields = [
            document.getElementById(this.email_body_field.id + "-error"),
            document.getElementById(this.email_body_field.id + "-error-invalid")
        ];

        this.social_icons = {
            facebook: document.getElementsByClassName("social-icon facebook")[0],
            linkedin: document.getElementsByClassName("social-icon linkedin")[0],
            github: document.getElementsByClassName("social-icon github")[0]
        };
    }

    Test(page){

        if (page < this.pages.length){
            this.pages.forEach((page) => {
                page.classList.add("step-hide");
                page.classList.remove("active");
            });

            this.pages[page].classList.add("active");

            this.SetHeight(this.pages[page]);

            this.form_previous.disabled = false;

            if (page + 1 === this.pages.length){
                if (!this.form_next.classList.contains("hide")){
                    this.form_next.classList.add("hide");
                }
                if (this.form_send.classList.contains("hide")){
                    this.form_send.classList.remove("hide");
                }
            }

            this.progress_values.forEach((value) => {
                this.progress_element.classList.remove("progress-" + value);
            });

            const newProgressClass = "progress-" + this.progress_values[page];
            this.progress_element.classList.add(newProgressClass);
        }
    }

    Init(){
        this.AddEventListeners();
        this.SetHeight(this.pages[0]);

        this.email_body.style.height = "1px";
        this.email_body.style.height = (this.email_body.scrollHeight) + "px";

        if (this.pages[0].classList.contains("active")) {
            if (!this.form_previous.classList.contains("hidden")) {
                this.form_previous.classList.add("hidden");
            }
        }

        if (window.location.search === '?msg=success') {

            const messageBox = document.getElementsByClassName("message_success")[0];

            if (messageBox.classList.contains("hidden")) {
                messageBox.classList.remove("hidden")
            }

        } else if (window.location.search === "?msg=error") {

            const messageBox = document.getElementsByClassName("message_error")[0];

            if (messageBox.classList.contains("hidden")) {
                messageBox.classList.remove("hidden")
            }
        }
    }

    AddEventListeners() {

        function hideErrorFields(fields) {
            fields.forEach((field) => {
                if (!field.classList.contains("hidden")) {
                    field.classList.add("hidden");
                }
            });
        }

        this.email_details_fields.forEach((field) => {
            field.addEventListener("click", () => {
                hideErrorFields(this.email_details_error_fields);
            });
        });

        this.email_body_field.addEventListener("click", () => {
            hideErrorFields(this.email_body_error_fields);
        });

        this.email_details_error_fields.forEach((field) => {
            field.addEventListener("click", (event) => { event.preventDefault(); })
        });

        this.email_body_error_fields.forEach((field) => {
            field.addEventListener("click", (event) => { event.preventDefault(); })
        });

        /**
         * Upon window resize, re-set the height of page
         */
        window.addEventListener("resize", () => {

            for (let i = 0; i < this.pages.length -1; i++) {
                if (this.pages[i].classList.contains("active")) {
                    this.SetHeight(this.pages[i]);
                }
            }

        });

        this.email_body.addEventListener("keyup", () => {
            this.email_body.style.height = "1px";
            this.email_body.style.height = (this.email_body.scrollHeight) + "px";
            this.SetHeight(this.pages[this.pages.length - 1]);
        });

        /* Hide current page, show previous page */
        this.form_previous.addEventListener("click", () => {
            for (let i = 0; i < this.pages.length; i++){
                if (!this.pages[i].classList.contains("active")){
                    continue;
                }

                /**
                 * If going back to page 0 from page 1, hide 'previous' button
                 */
                if (i -1 === 0) {
                    if (!this.form_previous.classList.contains("hidden")) {
                       this.form_previous.classList.add("hidden");
                    }
                }

                if (i > 0){
                    this.pages[i].classList.remove("active");
                    this.pages[i - 1].classList.add("active");

                    this.SetHeight(this.pages[i - 1]);

                    this.form_next.disabled = false;


                    if (!this.form_send.classList.contains("hide")){
                        this.form_send.classList.add("hide");

                    }
                    if (this.form_next.classList.contains("hide")){
                        this.form_next.classList.remove("hide");
                    }

                    if (i - 1 === 0){
                        this.form_previous.disabled = true;
                    }

                    this.progress_values.forEach((value) => {
                        this.progress_element.classList.remove("progress-" + value);
                    });

                    const newProgressClass = "progress-" + this.progress_values[i - 1];
                    this.progress_element.classList.add(newProgressClass);
                    break;
                }
            }
        });

        /* Hide current page, show next page */
        this.form_next.addEventListener("click", () => {

            function validateEmail(email) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            this.email_details_error_fields.forEach((field) => {
                if (!field.classList.contains("hidden")) {
                    field.classList.add("hidden");
                }
            });

            let valid_values = true;

            this.email_details_fields.forEach((field) => {

                if (field.value === "" || field.value === null || field.value === undefined) {

                    let error_field = document.getElementById(field.id + "-error");

                    if (error_field.classList.contains("hidden")) {
                        error_field.classList.remove("hidden");
                    }

                    valid_values = false;

                } else if (field.id === "email-address") {
                    if (!validateEmail(field.value)) {

                        let error_field = document.getElementById(field.id + "-error-invalid");

                        if (error_field.classList.contains("hidden")) {
                            error_field.classList.remove("hidden");
                        }

                        valid_values = false;

                    }
                }

            });

            if (!valid_values) { return; }

            for (let i = 0; i < this.pages.length; i++){
                if (!this.pages[i].classList.contains("active")){
                    continue;
                }

                if(this.form_previous.classList.contains("hidden")) {
                    this.form_previous.classList.remove("hidden");
                }

                if (i < this.pages.length - 1){
                    this.pages[i].classList.add("step-hide");

                    this.pages[i].classList.remove("active");
                    this.pages[i + 1].classList.add("active");

                    this.SetHeight(this.pages[i + 1]);

                    this.form_previous.disabled = false;

                    if (i + 1 === this.pages.length - 1){
                        if (!this.form_next.classList.contains("hide")){
                            this.form_next.classList.add("hide");
                        }
                        if (this.form_send.classList.contains("hide")){
                            this.form_send.classList.remove("hide");
                        }
                    }

                    this.progress_values.forEach((value) => {
                        this.progress_element.classList.remove("progress-" + value);
                    });

                    const newProgressClass = "progress-" + this.progress_values[i + 1];
                    this.progress_element.classList.add(newProgressClass);
                    break;
                }
            }
        });

        this.form_send.addEventListener("click", (event) => {

            function validateBody(body) {
                const regex = /g/;
                return regex.test(String(body).toLowerCase());
            }

            this.email_body_error_fields.forEach((field) => {

                if (!field.classList.contains("hidden")) {
                    field.classList.add("hidden");
                }

            });

            if (this.email_body_field.value === "" ||
                this.email_body_field.value === null ||
                this.email_body_field.value === undefined) {

                if (this.email_body_error_fields[0].classList.contains("hidden")) {
                    this.email_body_error_fields[0].classList.remove("hidden");
                }

                return event.preventDefault();

            } else if (this.email_body_field.id === "email-address") {

                if (!validateBody(this.email_body_field.value)) {

                    if (this.email_body_error_fields[1].classList.contains("hidden")) {
                        this.email_body_error_fields[1].classList.remove("hidden");
                    }

                    return event.preventDefault();
                }
            }
        });

        this.social_icons.facebook.addEventListener("click", () => {
            window.open("https://www.facebook.com/HarriotSoftware");
        });

        this.social_icons.linkedin.addEventListener("click", () => {
            window.open("https://www.linkedin.com/company/65014819");
        });

        this.social_icons.github.addEventListener("click", () => {
            window.open("https://github.com/Harriot-Software");
        });

    }

    /* Set height of form to match current page */
    SetHeight(target_step){
        let height = target_step.clientHeight;
        height += 60;

        this.form.setAttribute("style","height:" + height + "px");
    }
}