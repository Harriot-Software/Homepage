document.addEventListener("DOMContentLoaded", () => {

    const handler = new FormCarouselHandler();
    handler.Init();

    /* TESTING ONLY */
    //handler.Test(handler.pages[2]);
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
    }

    Test(page){
        for (let i = 0; i < this.pages.length; i++){
            if (this.pages[i].classList.contains("active")){
                this.pages[i].classList.remove("active");
            }
        }

        if (!page.classList.contains("active")){
            page.classList.add("active");
        }

        this.SetHeight(page);
    }

    Init(){
        this.AddEventListeners();
        this.SetHeight(this.pages[0]);
    }

    AddEventListeners() {

        this.email_body.addEventListener("keyup", () => {
            this.email_body.style.height = "1px";
            this.email_body.style.height = (25 + this.email_body.scrollHeight) + "px";
            this.SetHeight(this.pages[this.pages.length - 1]);
        });

        /* Hide current page, show previous page */
        this.form_previous.addEventListener("click", () => {
            for (let i = 0; i < this.pages.length; i++){
                if (!this.pages[i].classList.contains("active")){
                    continue;
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

            let fields = [
                document.getElementById("first-name"),
                document.getElementById("last-name"),
                document.getElementById("email-address")
            ];

            let error_fields = [
                document.getElementById("first-name-error"),
                document.getElementById("last-name-error"),
                document.getElementById("email-address-error")
            ];

            error_fields.forEach((field) => {
                if (!field.classList.contains("hidden")) {
                    field.classList.add("hidden");
                }
            });

            let valid_values = true;

            fields.forEach((field) => {

                if (field.value === "" || field.value === null || field.value === undefined) {

                    let error_field = document.getElementById(field.id + "-error");

                    if (error_field.classList.contains("hidden")) {
                        field.classList.remove("hidden");
                    }

                    valid_values = false;

                } else if (field.id === "email-address") {
                    if (!validateEmail(field.value)) {

                        let error_field = document.getElementById(field.id + "-error");

                        if (error_field.classList.contains("hidden")) {
                            field.classList.remove("hidden");
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
    }

    /* Set height of form to match current page */
    SetHeight(target_step){
        let height = target_step.clientHeight;
        height += 60;

        this.form.setAttribute("style","height:" + height + "px");
    }
}