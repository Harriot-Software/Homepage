/**************************************************************************************************
 *                                                                                                *
 *                       This file is subject to the terms and conditions                         *
 *                       defined in file 'LICENSE.txt', which is located                          *
 *                       in the source code package of this file.                                 *
 *                                                                                                *
 *                       Copyright (c) 2020 Harriot Software.                                     *
 *                                                                                                *
 **************************************************************************************************/

class PageHandler {

    constructor() {

        this.next_link = document.getElementById("next-link");
        this.next_section = document.getElementById("hidden-section");
        this.scroll_target = document.getElementById("section_scroll_anchor");

    }

    Init() {
        this.addEventListeners();
        this.animateIcon().Init();
    }

    addEventListeners() {

        /**
         * Scroll to scroll target with smooth behaviour
         */
        this.next_link.addEventListener('click', () => {
            this.scroll_target.scrollIntoView({
                behavior: 'smooth'
            });
        });

    }

    /**
     * Animates movement and visibility of next_link
     */
    animateIcon() {

        const next_link = this.next_link;
        const next_section = this.next_section;

        let windowHeight;

        function Init() {
            windowHeight = window.innerHeight;
            addEventHandlers();
            checkPosition();
        }

        function addEventHandlers() {
            window.addEventListener('scroll', checkPosition);
            window.addEventListener('resize', Init);
        }

        function checkPosition() {

            const positionFromTop = next_section.getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {

                /**
                 * Scrolled down, hide next_link
                 */
                if (!next_link.classList.contains("hide")) {
                    next_link.classList.add("hide");
                }

            } else {

                /**
                 * Scrolled up, show next_link
                 */
                if (next_link.classList.contains("hide")) {
                    next_link.classList.remove("hide");
                }
            }
        }

        return {
            Init: Init
        };
    }
}

module.exports = {
    PageHandler
};