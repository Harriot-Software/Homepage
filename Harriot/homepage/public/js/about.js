document.addEventListener("DOMContentLoaded", () => {

    const next_link = document.getElementsByClassName("page__next-link")[0];
    const scroll_target = document.getElementById("section_scroll_anchor");
    next_link.addEventListener("click", () => {
        scroll_target.scrollIntoView({
            behavior: 'smooth'
        });
    });


    const animateHTML = function () {
        const next_link = document.getElementsByClassName("page__next-link")[0];
        const next_section = document.getElementById("hidden-section");

        let windowHeight;

        function init() {
            windowHeight = window.innerHeight;
            addEventHandlers();
            checkPosition();
        }

        function addEventHandlers() {
            window.addEventListener('scroll', checkPosition);
            window.addEventListener('resize', init);
        }

        function checkPosition() {
            const positionFromTop = next_section.getBoundingClientRect().top;
            if (positionFromTop - windowHeight <= 0) {
                if (!next_link.classList.contains("hide")){
                    next_link.classList.add("hide");
                }
            } else {
                if (next_link.classList.contains("hide")){
                    next_link.classList.remove("hide");
                }
            }
        }

        return {
            init: init
        };
    };

    animateHTML().init();
});