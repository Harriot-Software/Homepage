class PageHandler {
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
            document.getElementById("step-email-body")
        ];

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

    Init(){
        this.AddEventListeners();
        this.SetHeight(this.pages[0]);

        /**
         * Resize email form body
         */
        this.email_body_field.style.height = "1px";
        this.email_body_field.style.height = (this.email_body_field.scrollHeight) + "px";

        /**
         * Set first page as active page
         */
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

        /**
         * When input field is clicked, hide error fields
         */
        this.email_details_fields.forEach((field) => {
            field.addEventListener("click", () => {
                hideErrorFields(this.email_details_error_fields);
            });
        });

        /**
         * When email body field is clicked, hide error field
         */
        this.email_body_field.addEventListener("click", () => {
            hideErrorFields(this.email_body_error_fields);
        });

        /**
         * Dont close error field when clicked
         */
        this.email_details_error_fields.forEach((field) => {
            field.addEventListener("click", (event) => { event.preventDefault(); })
        });

        /**
         * Dont close error field when clicked
         */
        this.email_body_error_fields.forEach((field) => {
            field.addEventListener("click", (event) => { event.preventDefault(); })
        });

        /**
         * Upon window resize, re-set the height of form
         */
        window.addEventListener("resize", () => {

            for (let i = 0; i < this.pages.length -1; i++) {
                if (this.pages[i].classList.contains("active")) {
                    this.SetHeight(this.pages[i]);
                }
            }

        });

        /**
         * Set height of the form according to email body height
         */
        this.email_body_field.addEventListener("keyup", () => {
            this.email_body_field.style.height = "1px";
            this.email_body_field.style.height = (this.email_body_field.scrollHeight) + "px";
            this.SetHeight(this.pages[this.pages.length - 1]);
        });

        /**
         * Show previous page
         */
        this.form_previous.addEventListener("click", () => {
            for (let i = 0; i < this.pages.length; i++){
                if (!this.pages[i].classList.contains("active")){
                    continue;
                }

                /**
                 * If going back to page 0 from page 1, hide 'previous' button
                 */
                if (i - 1 === 0) {
                    if (!this.form_previous.classList.contains("hidden")) {
                       this.form_previous.classList.add("hidden");
                    }
                }

                if (i > 0){
                    this.pages[i].classList.remove("active");
                    this.pages[i - 1].classList.add("active");

                    this.SetHeight(this.pages[i - 1]);

                    this.form_next.disabled = false;


                    /**
                     * Hide send -button
                     */
                    if (!this.form_send.classList.contains("hide")){
                        this.form_send.classList.add("hide");

                    }

                    /**
                     * Show next -button
                     */
                    if (this.form_next.classList.contains("hide")){
                        this.form_next.classList.remove("hide");
                    }

                    /**
                     * Remove progress classes from progress bar
                     */
                    this.progress_values.forEach((value) => {
                        if (this.progress_element.classList.contains("progress-" + value)) {
                            this.progress_element.classList.remove("progress-" + value);
                        }
                    });

                    /**
                     * Add new class to progress bar
                     */
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

            /**
             * Hide error fields
             */
            this.email_details_error_fields.forEach((field) => {
                if (!field.classList.contains("hidden")) {
                    field.classList.add("hidden");
                }
            });

            let valid_values = true;

            this.email_details_fields.forEach((field) => {

                /**
                 * Field has invalid values; show error
                 */
                if (field.value === "" || field.value === null || field.value === undefined) {

                    // TODO: Add validation

                    let error_field = document.getElementById(field.id + "-error");

                    if (error_field.classList.contains("hidden")) {
                        error_field.classList.remove("hidden");
                    }

                    valid_values = false;

                } else if (field.id === "email-address") {

                    /**
                     * Field has invalid values; show error
                     */
                    if (!validateEmail(field.value)) {

                        let error_field = document.getElementById(field.id + "-error-invalid");

                        if (error_field.classList.contains("hidden")) {
                            error_field.classList.remove("hidden");
                        }

                        valid_values = false;

                    }
                }

            });

            /**
             * If found invalid values, dont go to next page
             */
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

                    /**
                     * Last page; hide next -button and show send-button
                     */
                    if (i + 1 === this.pages.length - 1){
                        if (!this.form_next.classList.contains("hide")){
                            this.form_next.classList.add("hide");
                        }
                        if (this.form_send.classList.contains("hide")){
                            this.form_send.classList.remove("hide");
                        }
                    }

                    /**
                     * Remove progress classes from progress bar
                     */
                    this.progress_values.forEach((value) => {
                        if (this.progress_element.classList.contains("progress-" + value)) {
                            this.progress_element.classList.remove("progress-" + value);
                        }
                    });

                    /**
                     * Add new class to progress bar
                     */
                    const newProgressClass = "progress-" + this.progress_values[i + 1];
                    this.progress_element.classList.add(newProgressClass);

                    break;
                }
            }
        });

        this.form_send.addEventListener("click", (event) => {

            function validateBody(body) {

                // TODO: validation
                return true;

                const regex = /g/;
                return regex.test(String(body).toLowerCase());
            }

            /**
             * Hide body error fields
             */
            this.email_body_error_fields.forEach((field) => {

                if (!field.classList.contains("hidden")) {
                    field.classList.add("hidden");
                }

            });

            /**
             * Email body is invalid
             */
            if (this.email_body_field.value === "" ||
                this.email_body_field.value === null ||
                this.email_body_field.value === undefined) {

                if (this.email_body_error_fields[0].classList.contains("hidden")) {
                    this.email_body_error_fields[0].classList.remove("hidden");
                }

                return event.preventDefault();

            } else {

                /**
                 * Email body is invalid
                 */
                if (!validateBody(this.email_body_field.value)) {

                    if (this.email_body_error_fields[1].classList.contains("hidden")) {
                        this.email_body_error_fields[1].classList.remove("hidden");
                    }

                    return event.preventDefault();
                }
            }
        });

        /**
         * Add click event listeners to social icons
         */
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

    /**
     * Set height of form to match current page
     * @param target_step
     */
    SetHeight(target_step){
        let height = target_step.clientHeight;
        height += 60;

        this.form.setAttribute("style","height:" + height + "px");
    }
}

module.exports = {
    PageHandler
};