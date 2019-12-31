document.addEventListener("DOMContentLoaded", () => {
    const project_container_class = "project__image-container";
    const project_controller_class = "project__details__toggle";
    const project_content_class = "project__details__container";
    const project_containers = document.getElementsByClassName(project_container_class);
    const project_controllers = document.getElementsByClassName(project_controller_class);
    const project_contents = document.getElementsByClassName(project_content_class);

    for (let i = 0; i < project_controllers.length; i++){
        project_controllers[i].addEventListener("click", () => {
            const project_controller = new ProjectController(project_containers, project_controllers, project_contents, i);
            project_controller.handleClick();
        });
    }
});


class ProjectController {
    constructor(containers, controllers, contents, currentNumber){
        this.containers = containers;
        this.controllers = controllers;
        this.contents = contents;
        this.i = currentNumber;

        this.container = {
            element: this.containers[this.i]
        };
        this.controller = {
            element: this.controllers[this.i],
            list: this.controllers[this.i].classList
        };
        this.content = {
            element: this.contents[this.i],
            list: this.contents[this.i].classList
        };
    }

    handleClick(){

        for (let i = 0; i < this.controllers.length; i++){
            if (i === this.i){ continue; }
            let list = this.controllers[i].classList;
            if (list.contains("open")){
                list.remove("open");
            }
        }
        for (let i = 0; i < this.contents.length; i++){
            if (i === this.i){ continue; }
            let list = this.contents[i].classList;
            if (list.contains("open")){
                list.remove("open");
            }
        }

        if (!this.controller.list.contains("open")){
            this.controller.list.add("open");
            if (!this.content.list.contains("open")){
                this.content.list.add("open");

                // Credit: https://css-tricks.com/snippets/jquery/smooth-scrolling/
                setTimeout(() => {
                    this.controller.element.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 200);

            }
        } else {
            this.controller.list.remove("open");
            if (this.content.list.contains("open")){
                this.content.list.remove("open");

                // Credit: https://css-tricks.com/snippets/jquery/smooth-scrolling/
                setTimeout(() => {
                    this.container.element.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }
}
