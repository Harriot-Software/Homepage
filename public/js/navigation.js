document.addEventListener("DOMContentLoaded", () => {
    const hidden_links = document.getElementById("hidden-links-container");

    const handler = new NavigationHandler(hidden_links);
    handler.Init();
});

class NavigationHandler {

    constructor(hidden_links){

        this.hidden_links = {
            elem: hidden_links,
            classList: hidden_links.classList,
            mouseOverListener: () => {
                if (!this.hidden_links.classList.contains("hovered")){
                    this.hidden_links.classList.add("hovered");
                }
            },
            mouseOutListener: () => {
                if (this.hidden_links.classList.contains("hovered")){
                    this.hidden_links.classList.remove("hovered");
                }
            }
        }

    }

    /* Initialize handler with default handlers */
    Init(){
        this.AddMouseMoveEvent();
        this.AddCommonEvents();
    }

    /*
    * If mouse is moved, add hover events
    * --> only enable hover events on PC
    * --> remove now-useless event after use
    */
    AddMouseMoveEvent(){
        const listener = () => {
            document.removeEventListener("mousemove", listener, false);
            this.AddHoverEvents();
        };

        document.addEventListener("mousemove", listener, false);
    }

    /* Add hover events to hidden_links */
    AddHoverEvents(){
        this.hidden_links.elem.addEventListener("mouseover", this.hidden_links.mouseOverListener, false);
        this.hidden_links.elem.addEventListener("mouseout", this.hidden_links.mouseOutListener, false);
    }
    /* Remove hover events from hidden_links */
    RemoveHoverEvents(){
        this.hidden_links.elem.removeEventListener("mouseover", this.hidden_links.mouseOverListener, false);
        this.hidden_links.elem.removeEventListener("mouseout", this.hidden_links.mouseOutListener, false);
    }

    /* Misc events */
    AddCommonEvents(){
        /*
        * Upon hidden_links click, remove hover events
        * --> simulate hover effect
        */
        this.hidden_links.elem.addEventListener("click", () => {
            this.RemoveHoverEvents();
            this.AddMouseMoveEvent();

            if (!this.hidden_links.classList.contains("hovered")){
                this.hidden_links.classList.add("hovered");
            } else {
                this.hidden_links.classList.remove("hovered");
            }
        });

        /*
        * Upon scrolling page, give navigation
        * the ".scrolled" class
        */
        window.addEventListener('scroll', () => {

            const navigation = document.getElementsByClassName('navigation')[0];

            if (window.scrollY === 0) {
                if (navigation.classList.contains("scrolled")){
                    navigation.classList.remove("scrolled");
                }
            } else {
                navigation.classList.add("scrolled");
            }

        });

    }

}