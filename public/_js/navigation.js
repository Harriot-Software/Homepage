class NavigationHandler {

    constructor(){
        this.hidden_links = document.getElementById("hidden-links-container");
    }

    Init(){
        this.AddMouseMoveEvent();
        this.AddCommonEvents();
    }

    /**
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

    /**
     *  Add hover events to hidden_links
     */
    AddHoverEvents(){

        this.hidden_links.addEventListener("mouseover", () => {
            if (!this.hidden_links.classList.contains("hovered")){
                this.hidden_links.classList.add("hovered");
            }
        }, false);

        this.hidden_links.addEventListener("mouseout", () => {
            if (this.hidden_links.classList.contains("hovered")){
                this.hidden_links.classList.remove("hovered");
            }
        }, false);

    }

    /**
     * Remove hover events from hidden_links
     */
    RemoveHoverEvents(){

        this.hidden_links.removeEventListener("mouseover", () => {
            if (!this.hidden_links.classList.contains("hovered")){
                this.hidden_links.classList.add("hovered");
            }
        }, false);

        this.hidden_links.removeEventListener("mouseout", () => {
            if (this.hidden_links.classList.contains("hovered")){
                this.hidden_links.classList.remove("hovered");
            }
        }, false);

    }

    AddCommonEvents(){

        /**
        * Upon hidden_links click, remove hover events
        * --> simulate hover effect
        */
        this.hidden_links.addEventListener("click", () => {
            this.RemoveHoverEvents();
            this.AddMouseMoveEvent();

            if (!this.hidden_links.classList.contains("hovered")){
                this.hidden_links.classList.add("hovered");
            } else {
                this.hidden_links.classList.remove("hovered");
            }
        });

        /**
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

module.exports = {
    NavigationHandler
};